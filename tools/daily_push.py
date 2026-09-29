import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path, PurePosixPath


def git(repo: Path, *args: str, env: dict[str, str] | None = None) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo), *args],
        check=True,
        capture_output=True,
        text=True,
        env=env,
    )
    return result.stdout.strip()


def source_files(repo: Path, source_commit: str) -> dict[str, tuple[str, str]]:
    output = subprocess.run(
        ["git", "-C", str(repo), "ls-tree", "-r", "-z", source_commit],
        check=True,
        capture_output=True,
    ).stdout
    entries: dict[str, tuple[str, str]] = {}
    for record in output.split(b"\0"):
        if not record:
            continue
        metadata, raw_path = record.split(b"\t", 1)
        mode, object_type, object_id = metadata.decode("ascii").split()
        path = raw_path.decode("utf-8", errors="surrogateescape")
        name = PurePosixPath(path).name
        if name == ".env" or (name.startswith(".env.") and name != ".env.example"):
            continue
        entries[path] = (mode, object_id)
    return entries


def remote_head(repo: Path, remote: str, branch: str) -> str | None:
    output = git(repo, "ls-remote", "--heads", remote, f"refs/heads/{branch}")
    if not output:
        return None
    return output.split()[0]


def write_state(path: Path, state: dict[str, object]) -> None:
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def make_commit(
    repo: Path,
    source_commit: str,
    files: list[str],
    parent: str | None,
    message: str,
) -> str:
    with tempfile.TemporaryDirectory(prefix="stockx-daily-push-") as temp_dir:
        index_path = Path(temp_dir) / "index"
        env = os.environ.copy()
        env["GIT_INDEX_FILE"] = str(index_path)
        subprocess.run(
            ["git", "-C", str(repo), "read-tree", "--empty"],
            check=True,
            env=env,
        )
        tree_entries = source_files(repo, source_commit)
        for path in files:
            mode, object_id = tree_entries[path]
            subprocess.run(
                [
                    "git",
                    "-C",
                    str(repo),
                    "update-index",
                    "--add",
                    "--cacheinfo",
                    f"{mode},{object_id},{path}",
                ],
                check=True,
                env=env,
            )
        tree = git(repo, "write-tree", env=env)
        command = ["commit-tree", tree]
        if parent:
            command.extend(["-p", parent])
        command.extend(["-m", message])
        return git(repo, *command)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Publish a committed source snapshot to GitHub in file batches."
    )
    parser.add_argument("--batch-size", type=int, default=10)
    parser.add_argument("--state-file", default=".daily_push_state.json")
    parser.add_argument("--remote", default="origin")
    parser.add_argument("--branch", default="main")
    parser.add_argument("--source-ref", default="HEAD")
    parser.add_argument("--initialize", action="store_true")
    parser.add_argument("--replace-existing-branch", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if args.batch_size < 1:
        parser.error("--batch-size must be at least 1")

    try:
        repo = Path(git(Path.cwd(), "rev-parse", "--show-toplevel"))
        state_path = (repo / args.state_file).resolve()

        if args.initialize:
            if state_path.exists():
                raise ValueError(f"State file already exists: {state_path}")
            source_commit = git(repo, "rev-parse", "--verify", f"{args.source_ref}^{{commit}}")
            entries = source_files(repo, source_commit)
            if not entries:
                raise ValueError("The source commit has no publishable files.")
            existing_head = remote_head(repo, args.remote, args.branch)
            if existing_head and not args.replace_existing_branch:
                raise ValueError(
                    f"{args.remote}/{args.branch} already exists. Review the impact, "
                    "then rerun with --replace-existing-branch to replace it on first push."
                )
            state: dict[str, object] = {
                "source_commit": source_commit,
                "files": sorted(entries),
                "published_count": 0,
                "last_commit": None,
                "remote_initialized": False,
                "expected_remote_head": existing_head,
                "remote": args.remote,
                "branch": args.branch,
            }
            if args.dry_run:
                print(f"Would initialize from {source_commit} with {len(entries)} files.")
                print("First batch:")
                for path in sorted(entries)[: args.batch_size]:
                    print(f"  {path}")
                return 0
            write_state(state_path, state)
            print(f"Initialized {state_path} with {len(entries)} files.")
            print("No remote changes made. Run again without --initialize to publish a batch.")
            return 0

        if not state_path.exists():
            raise ValueError("No state file found. Start with --initialize (use --dry-run first).")

        state = json.loads(state_path.read_text(encoding="utf-8"))
        if state["remote"] != args.remote or state["branch"] != args.branch:
            raise ValueError("Remote/branch differ from the initialized state file.")
        files = state["files"]
        published_count = int(state["published_count"])
        if published_count >= len(files):
            print("All files have already been published.")
            return 0

        end = min(published_count + args.batch_size, len(files))
        batch = files[published_count:end]
        batch_number = (published_count // args.batch_size) + 1
        message = f"chore: publish source batch {batch_number}"
        print(f"Next batch: {len(batch)} files ({published_count + 1}-{end} of {len(files)})")
        for path in batch:
            print(f"  {path}")
        if args.dry_run:
            return 0

        commit = make_commit(
            repo,
            state["source_commit"],
            files[:end],
            state["last_commit"],
            message,
        )
        git(repo, "update-ref", "refs/heads/daily-publish", commit)

        push_args = ["push"]
        if not state["remote_initialized"] and state["expected_remote_head"]:
            expected = state["expected_remote_head"]
            push_args.append(f"--force-with-lease=refs/heads/{args.branch}:{expected}")
        push_args.extend([args.remote, f"{commit}:refs/heads/{args.branch}"])
        git(repo, *push_args)

        state["published_count"] = end
        state["last_commit"] = commit
        state["remote_initialized"] = True
        state["expected_remote_head"] = commit
        write_state(state_path, state)
        print(f"Pushed {commit[:12]} to {args.remote}/{args.branch}.")
        return 0
    except (OSError, subprocess.CalledProcessError, KeyError, ValueError) as error:
        detail = error.stderr.strip() if isinstance(error, subprocess.CalledProcessError) and error.stderr else str(error)
        print(f"daily_push: {detail}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())