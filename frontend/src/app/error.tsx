"use client";

import { motion } from "framer-motion";
import { RotateCcw, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-midnight px-6 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(214,168,79,0.18),transparent_34%),linear-gradient(180deg,#090d16,#0f172a)]" />
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel relative max-w-2xl rounded-[2.5rem] p-8 text-center sm:p-12"
      >
        <ShieldAlert className="mx-auto h-10 w-10 text-amber-100" />
        <p className="eyebrow mt-8">Protected Experience</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.07em] text-white sm:text-6xl">
          Aegis encountered a temporary interruption.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-300">
          The application has preserved the session boundary. Retry the experience or return
          after the API connection is restored.
        </p>
        {error.digest && <p className="mt-4 text-xs text-slate-500">Reference: {error.digest}</p>}
        <button type="button" onClick={reset} className="luxury-button mt-8">
          <RotateCcw className="mr-3 h-4 w-4" />
          Retry Experience
        </button>
      </motion.div>
    </div>
  );
}
