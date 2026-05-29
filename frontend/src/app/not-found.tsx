import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-midnight px-6 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(247,231,180,0.16),transparent_34%),linear-gradient(180deg,#090d16,#0f172a)]" />
      <div className="glass-panel relative max-w-2xl rounded-[2.5rem] p-8 text-center sm:p-12">
        <Scale className="mx-auto h-10 w-10 text-amber-100" />
        <p className="eyebrow mt-8">404 Jurisdiction</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.9] tracking-[-0.07em] text-white sm:text-7xl">
          This chamber is sealed.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-300">
          The page you requested is outside the current Aegis Legal Partners experience.
        </p>
        <Link href="/" className="luxury-button mt-8">
          <ArrowLeft className="mr-3 h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
