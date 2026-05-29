import { Scale } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-midnight px-6">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-aura blur-3xl" />
      <div className="glass-panel relative flex w-full max-w-sm flex-col items-center rounded-[2rem] p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-100/30 bg-amber-100/10 shadow-aureate">
          <Scale className="h-7 w-7 animate-pulse text-amber-100" />
        </div>
        <p className="eyebrow mt-7">Aegis Loading</p>
        <h1 className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-white">
          Preparing counsel.
        </h1>
        <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-sheen rounded-full bg-gold-gradient" />
        </div>
      </div>
    </div>
  );
}
