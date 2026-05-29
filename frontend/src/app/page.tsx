"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Gavel,
  Gem,
  Globe2,
  Landmark,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Star,
  Wifi,
  Zap,
  type LucideIcon
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAttorneys, getPracticeAreas, getTestimonials } from "@/lib/api";
import type { Attorney, PracticeArea, Testimonial } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  Scale,
  Fingerprint,
  ShieldCheck,
  Gem
};

const premiumEase = [0.16, 1, 0.3, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0, y: 46, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: premiumEase }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06
    }
  }
};

const statistics = [
  { label: "Years of Experience", value: 28, suffix: "+", icon: Award },
  { label: "Cases Won", value: 740, suffix: "+", icon: Gavel },
  { label: "Global Clients", value: 32, suffix: "", icon: Globe2 },
  { label: "Billion-Dollar Transactions", value: 18, suffix: "+", icon: Building2 }
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frame = 0;
    const totalFrames = 72;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setDisplayValue(Math.round(value * progress));

      if (frame >= totalFrames) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function LoadingCard() {
  return (
    <div className="glass-panel h-[25rem] animate-pulse rounded-[2rem]">
      <div className="h-52 rounded-t-[2rem] bg-white/[0.06]" />
      <div className="space-y-4 p-6">
        <div className="h-4 w-3/4 rounded-full bg-white/[0.08]" />
        <div className="h-3 w-full rounded-full bg-white/[0.06]" />
        <div className="h-3 w-5/6 rounded-full bg-white/[0.06]" />
      </div>
    </div>
  );
}

function CursorAura() {
  const shouldReduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-480);
  const cursorY = useMotionValue(-480);
  const springX = useSpring(cursorX, { stiffness: 58, damping: 28, mass: 0.8 });
  const springY = useSpring(cursorY, { stiffness: 58, damping: 28, mass: 0.8 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (!pointerQuery.matches) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX - 240);
      cursorY.set(event.clientY - 240);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [cursorX, cursorY, shouldReduceMotion]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(247,231,180,0.13),rgba(214,168,79,0.055)_34%,transparent_68%)] blur-2xl lg:block"
    />
  );
}

export default function HomePage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.32], [0, 110]);
  const heroCardY = useTransform(scrollYProgress, [0, 0.26], [0, -36]);

  useEffect(() => {
    let isMounted = true;

    Promise.all([getPracticeAreas(), getAttorneys(), getTestimonials()])
      .then(([practiceAreaData, attorneyData, testimonialData]) => {
        if (!isMounted) {
          return;
        }

        setPracticeAreas(practiceAreaData);
        setAttorneys(attorneyData);
        setTestimonials(testimonialData);
      })
      .catch((requestError: Error) => {
        if (isMounted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  const activeQuote = testimonials[activeTestimonial];

  const trustIndicators = useMemo(
    () => [
      "Board-level counsel",
      "Private client discretion",
      "Enterprise PWA ready",
      "Secure consultation intake"
    ],
    []
  );

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-midnight">
      <CursorAura />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <div className="absolute left-[-9rem] top-28 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl animate-aurora" />
        <div className="absolute right-[-8rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-3xl animate-aurora" />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl animate-float" />
      </div>

      <section className="relative z-10 flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28">
        <motion.div style={{ y: heroImageY }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2200&q=90"
            alt="Monolithic luxury architecture in shadow"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.32]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(247,231,180,0.2),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(99,102,241,0.18),transparent_28%),linear-gradient(90deg,rgba(9,13,22,0.99),rgba(9,13,22,0.74)_50%,rgba(9,13,22,0.94))]" />
        <div className="premium-divider bottom-24" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-midnight to-transparent" />

        <div className="section-shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28 2xl:gap-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={sectionVariants} className="eyebrow">
              Elite Legal Command
            </motion.p>
            <motion.h1
              variants={sectionVariants}
              className="mt-6 max-w-5xl font-display text-[clamp(3.35rem,11vw,8.9rem)] leading-[0.86] tracking-[-0.075em] text-white"
            >
              Counsel for the moments that define legacy.
            </motion.h1>
            <motion.p
              variants={sectionVariants}
              className="mt-8 max-w-[43rem] text-[1.02rem] leading-8 text-slate-300 sm:text-lg sm:leading-9"
            >
              Aegis Legal Partners blends boardroom-grade legal strategy, private client
              discretion, and cinematic digital access for high-stakes corporate, criminal,
              intellectual property, and family office matters.
            </motion.p>
            <motion.div variants={sectionVariants} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/consultation" className="luxury-button w-full sm:w-auto">
                Request Private Counsel
              </Link>
              <a
                href="#practice"
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-xl transition duration-700 hover:-translate-y-0.5 hover:border-amber-100/45 hover:bg-amber-200/10 sm:w-auto"
              >
                Explore Expertise
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={sectionVariants}
              className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {trustIndicators.map((indicator) => (
                <div
                  key={indicator}
                  className="glass-panel rounded-2xl px-4 py-4 text-[0.68rem] font-bold uppercase leading-5 tracking-[0.2em] text-slate-300"
                >
                  <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.8)]" />
                  {indicator}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.25, ease: premiumEase }}
            style={{ y: heroCardY }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-radial-aura blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-[2.4rem] p-3 sm:p-5">
              <div className="relative h-[28rem] overflow-hidden rounded-[2rem] sm:h-[34rem]">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=90"
                  alt="Premium executive architecture interior"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition duration-[1800ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute bottom-0 p-6 sm:p-7">
                  <p className="eyebrow">Aegis Boardroom</p>
                  <p className="mt-3 font-display text-3xl leading-none tracking-[-0.05em] text-white sm:text-4xl">
                    Strategic advantage, privately held.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="practice" className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="section-shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={sectionVariants}
            className="max-w-4xl"
          >
            <p className="eyebrow">Practice Architecture</p>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.7rem)] leading-[0.92] tracking-[-0.07em] text-white">
              Disciplines shaped for pressure, privacy, and scale.
            </h2>
          </motion.div>

          {error && (
            <div className="mt-8 rounded-2xl border border-red-400/25 bg-red-500/10 p-5 text-sm text-red-100">
              {error}
            </div>
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => <LoadingCard key={index} />)
              : practiceAreas.map((area) => {
                  const Icon = iconMap[area.iconName] || Briefcase;

                  return (
                    <motion.article
                      key={area.id}
                      variants={sectionVariants}
                      whileHover={{ y: -8, transition: { duration: 0.55, ease: premiumEase } }}
                      className="group glass-panel relative min-h-[25rem] overflow-hidden rounded-[2rem] sm:min-h-[27rem]"
                    >
                      <Image
                        src={area.imageUrl}
                        alt={area.title}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-[0.58] transition duration-[1600ms] group-hover:scale-110 group-hover:opacity-[0.78]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-transparent" />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/60 to-transparent opacity-0 transition duration-700 group-hover:opacity-100" />
                      <div className="relative flex h-full min-h-[25rem] flex-col justify-end p-6 sm:min-h-[27rem]">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/30 bg-amber-200/10 text-amber-100 shadow-aureate">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-display text-3xl leading-[0.95] tracking-[-0.05em] text-white">
                          {area.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-300">{area.description}</p>
                      </div>
                    </motion.article>
                  );
                })}
          </motion.div>
        </div>
      </section>

      <section id="attorneys" className="relative z-10 overflow-hidden py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-x-0 top-12 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
        <div className="section-shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={sectionVariants}
            className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"
          >
            <div>
              <p className="eyebrow">The Legal Board</p>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,6.4vw,5.35rem)] leading-[0.93] tracking-[-0.07em] text-white">
                A private bench for complex public consequences.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 lg:justify-self-end lg:pb-2">
              Every partner profile is composed for executive decision-makers: credentials,
              case posture, and disciplined strategic presence without visual noise.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => <LoadingCard key={index} />)
              : attorneys.map((attorney) => (
                  <motion.article
                    key={attorney.id}
                    variants={sectionVariants}
                    whileHover={{ y: -8, transition: { duration: 0.55, ease: premiumEase } }}
                    className="group glass-panel overflow-hidden rounded-[2rem]"
                  >
                    <div className="relative h-[25rem] overflow-hidden sm:h-[28rem] xl:h-[26rem]">
                      <Image
                        src={attorney.portraitUrl}
                        alt={attorney.name}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center transition duration-[1600ms] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-midnight/58 p-5 backdrop-blur-xl">
                        <h3 className="font-display text-3xl leading-none tracking-[-0.05em] text-white">
                          {attorney.name}
                        </h3>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-amber-100">
                          {attorney.title}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {attorney.credentials}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{attorney.biography}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {attorney.expertise.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-amber-100"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
          </motion.div>
        </div>
      </section>

      <section id="results" className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="section-shell">
          <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-16">
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-200/10 blur-3xl" />
            <div className="premium-divider top-0" />
            <div className="relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-120px" }}
                variants={sectionVariants}
              >
                <p className="eyebrow">Measured Authority</p>
                <h2 className="mt-5 font-display text-[clamp(2.6rem,6.2vw,5.1rem)] leading-[0.93] tracking-[-0.07em] text-white">
                  Numbers with consequence.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
                  A premium results field built with animated counters, restrained glow,
                  and institutional spacing for credible executive impact.
                </p>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {statistics.map(({ label, value, suffix, icon: Icon }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.85, delay: index * 0.12, ease: premiumEase }}
                    className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 transition duration-700 hover:border-amber-100/25 hover:bg-slate-950/60"
                  >
                    <Icon className="h-6 w-6 text-amber-200" />
                    <p className="mt-8 font-display text-5xl tracking-[-0.07em] text-white sm:text-6xl">
                      <AnimatedCounter value={value} suffix={suffix} />
                    </p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="section-shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={sectionVariants}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="eyebrow">Client Confidence</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,6.2vw,5.2rem)] leading-[0.93] tracking-[-0.07em] text-white">
              Quiet praise from rooms that rarely speak publicly.
            </h2>
          </motion.div>

          <div className="relative mx-auto mt-14 max-w-4xl">
            <div className="absolute -inset-8 rounded-full bg-radial-aura blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:p-14">
              {isLoading || !activeQuote ? (
                <div className="h-72 animate-pulse rounded-[2rem] bg-white/[0.05]" />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeQuote.client}-${activeTestimonial}`}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                    transition={{ duration: 0.75, ease: premiumEase }}
                  >
                    <div className="flex justify-center gap-2">
                      {Array.from({ length: activeQuote.rating }).map((_, index) => (
                        <Star key={index} className="h-5 w-5 fill-amber-200 text-amber-200" />
                      ))}
                    </div>
                    <p className="mt-8 text-center font-display text-3xl leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl">
                      “{activeQuote.testimonial}”
                    </p>
                    <div className="mt-10 text-center">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-100">
                        {activeQuote.client}
                      </p>
                      <p className="mt-2 text-sm text-slate-400">{activeQuote.company}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setActiveTestimonial((current) =>
                      testimonials.length ? (current - 1 + testimonials.length) % testimonials.length : 0
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-500 hover:border-amber-200/40 hover:text-amber-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() =>
                    setActiveTestimonial((current) =>
                      testimonials.length ? (current + 1) % testimonials.length : 0
                    )
                  }
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition duration-500 hover:border-amber-200/40 hover:text-amber-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 sm:py-24 lg:py-28">
        <div className="section-shell">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerContainer}
            className="grid gap-5 md:grid-cols-3"
          >
            {[
              {
                icon: Wifi,
                title: "Offline Capability",
                body: "Service worker caching keeps core brand access resilient on unstable networks."
              },
              {
                icon: Zap,
                title: "Installable App",
                body: "A standalone manifest gives executives a polished home-screen experience."
              },
              {
                icon: LockKeyhole,
                title: "Secure Browsing",
                body: "The interface is tuned for HTTPS deployment, controlled origins, and trusted access."
              }
            ].map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={sectionVariants}
                whileHover={{ y: -7, transition: { duration: 0.55, ease: premiumEase } }}
                className="glass-panel rounded-[2rem] p-7 transition duration-700 hover:border-amber-100/25"
              >
                <Icon className="h-7 w-7 text-amber-200" />
                <h3 className="mt-7 font-display text-3xl leading-none tracking-[-0.05em] text-white">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="section-shell">
          <div className="relative overflow-hidden rounded-[2.75rem] border border-amber-100/20 bg-gradient-to-br from-amber-100/16 via-white/[0.055] to-indigo-400/10 p-7 shadow-aureate sm:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,247,214,0.22),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(99,102,241,0.18),transparent_34%)]" />
            <div className="premium-divider top-0" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">Private Intake</p>
                <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] tracking-[-0.07em] text-white">
                  Bring your matter to a room built for consequence.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
                  Schedule an encrypted-feeling demo consultation flow with responsive validation,
                  loading states, and a polished board-level confirmation.
                </p>
              </div>
              <Link href="/consultation" className="luxury-button w-full sm:w-auto">
                Begin Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
