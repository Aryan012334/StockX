import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/">
              <Image src="/logo.svg" alt="StockX logo" width={170} height={60} />
            </Link>
            <p className="text-sm text-muted-foreground">
              A simulated stock trading platform. Practice with virtual capital, risk-free.
            </p>
          </div>

          {/* Links */}
          <div className="lg:place-items-center">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/docs">Docs</Link></li>
              <li><Link href="/legal">Terms & Privacy</Link></li>
            </ul>
          </div>

          {/* GitHub only */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Connect</h4>
            <div className="flex gap-4">
              <Link href="https://github.com/Aryan-Yewale" target="_blank">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <span className="mt-4 text-neutral-200 text-xs flex items-center">
            Developed by{" "}
            <span className="font-semibold ml-1">Aryan Yewale</span>
          </span>
          <p className="text-xs text-muted-foreground">
            © StockX — Simulated trading. Not financial advice. No real money involved.
          </p>
        </div>
      </div>
    </footer>
  );
}
