import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone, Scale, Twitter } from "lucide-react";

const footerLinks = ["Corporate Law", "M&A", "Intellectual Property", "Criminal Defense", "Private Wealth"];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
      <div className="absolute left-1/2 top-0 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="premium-divider top-0" />
      <div className="section-shell relative py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-100/25 bg-white/[0.06] shadow-aureate">
                <Scale className="h-5 w-5 text-amber-100" />
              </span>
              <span>
                <span className="block font-display text-2xl leading-none tracking-[0.22em] text-white">AEGIS</span>
                <span className="block text-[0.65rem] uppercase tracking-[0.36em] text-slate-400">
                  Legal Partners
                </span>
              </span>
            </Link>
            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400">
              A cinematic legal platform for executive counsel, private wealth protection,
              enterprise transactions, and high-discretion advocacy.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://www.linkedin.com"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition duration-500 hover:-translate-y-0.5 hover:border-amber-100/40 hover:bg-amber-200/10 hover:text-amber-100"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl tracking-[-0.04em] text-white">Practice Portfolio</h3>
            <div className="mt-6 grid gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link}
                  href="/#practice"
                  className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300 transition duration-500 hover:border-amber-100/30 hover:bg-white/[0.055] hover:text-amber-100"
                >
                  {link}
                  <ArrowUpRight className="h-4 w-4 opacity-50 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl tracking-[-0.04em] text-white">Private Reception</h3>
            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-400">
              <p className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                88 Sovereign Court, Financial District, New York
              </p>
              <p className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                +1 (212) 555-0148
              </p>
              <p className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                concierge@aegislegal.example
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.68rem] uppercase leading-6 tracking-[0.24em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Aegis Legal Partners. All rights reserved.</p>
          <p>Secure PWA Experience · Enterprise Demo</p>
        </div>
      </div>
    </footer>
  );
}
