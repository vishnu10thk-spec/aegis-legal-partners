"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Scale, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Practice", href: "/#practice" },
  { label: "Attorneys", href: "/#attorneys" },
  { label: "Results", href: "/#results" },
  { label: "Testimonials", href: "/#testimonials" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-midnight/68 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
    >
      <nav className="section-shell flex h-20 items-center justify-between sm:h-[5.5rem]">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-100/25 bg-white/[0.06] shadow-aureate">
            <Scale className="h-5 w-5 text-amber-100 transition duration-700 group-hover:rotate-6" />
          </span>
          <span>
            <span className="block font-display text-xl leading-none tracking-[0.2em] text-white">AEGIS</span>
            <span className="block text-[0.62rem] uppercase tracking-[0.35em] text-slate-400">
              Legal Partners
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-xs font-bold uppercase tracking-[0.28em] text-slate-300 transition duration-500 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-amber-100/70 after:transition-all after:duration-500 hover:text-amber-100 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/consultation"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-amber-100/25 bg-white/[0.05] px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-100 transition duration-500 hover:border-amber-100/55 hover:bg-amber-200/10"
          >
            Consult
            <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle mobile navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition duration-500 hover:border-amber-100/40 lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-midnight/94 backdrop-blur-2xl lg:hidden"
          >
            <div className="section-shell flex flex-col gap-3 py-5">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block min-h-14 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold uppercase tracking-[0.22em] text-slate-200 transition duration-500 hover:border-amber-100/30 hover:text-amber-100"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/consultation"
                onClick={() => setIsOpen(false)}
                className="luxury-button mt-2 w-full"
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
