import Link from "next/link";
import { ArrowUpRight, Github, Globe, Mail } from "lucide-react";

const links = [
  {
    href: "mailto:aryan.yewale@example.com",
    label: "Email",
    value: "aryan.yewale@example.com",
    icon: Mail,
  },
  {
    href: "https://github.com/Aryan-Yewale",
    label: "GitHub",
    value: "Aryan-Yewale",
    icon: Github,
  },
];

export default function ContactCard() {
  return (
    <section className="w-full">
      <div className="border-t border-border">
        <div className="grid md:grid-cols-2">
          {/* Left */}
          <div className="border-b border-border p-10 md:border-b-0 md:border-r">
            <div className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-5 bg-[var(--brand-cyan)]" />
              Contact
            </div>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              Let's build better systems.
            </h2>

            <p className="mt-6 max-w-md leading-8 text-muted-foreground">
              StockX is a stock trading simulation platform built to demonstrate
              the architecture behind modern electronic exchanges — matching engines,
              real-time order books, and atomic settlement. If you'd like to
              discuss distributed systems, trading infrastructure, or have feedback
              on the project, I'd love to connect.
            </p>
          </div>

          {/* Right */}
          <div>
            {links.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group flex items-center justify-between px-8 py-7 transition-colors hover:bg-muted/30 ${
                    index !== links.length - 1 ? "border-b border-border" : ""
                  }`}>
                  <div className="flex items-center gap-5">
                    <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[var(--brand-cyan)]" />
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--brand-cyan)]" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
