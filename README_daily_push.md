# Daily Push Utility

`tools/daily_push.py` publishes a committed source snapshot to a remote branch in
file batches. Commits are created at the time they are published and labeled as
source-publication batches; they do not claim to be the original development
commits.

## Preview and initialize

Run from the repository root. First preview the source snapshot and first batch:

```powershell
python tools/daily_push.py --initialize --dry-run --batch-size 10
```

Initialize local progress state without changing GitHub:

```powershell
python tools/daily_push.py --initialize --batch-size 10
```

The source defaults to the current `HEAD`; only files committed at that ref are
included. The utility omits `.env` and other `.env.*` files except `.env.example`.

## Publish batches

Preview the next batch, then publish it:

```powershell
python tools/daily_push.py --dry-run --batch-size 10
python tools/daily_push.py --batch-size 10
```

Each invocation publishes one batch. Run it on a daily schedule, or run it more
often for multiple publication batches in a day. Commits use the configured Git
author and current time. The script does not backdate commits.

## Existing remote branch

StockX `main` already contains the full project. By default, initialization refuses
to target an existing remote branch. To intentionally replace that branch on the
first batch, initialize with:

```powershell
python tools/daily_push.py --initialize --batch-size 10 --replace-existing-branch
```

This rewrites the remote branch history on the first publish. The push uses a
lease against the remote commit observed during initialization and fails if the
branch changes in the meantime. Keep a local backup before using this option.

Progress is stored in `.daily_push_state.json`; keep it local and do not commit it.
The script writes a separate local `daily-publish` branch ref as batches advance.