"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, PlayCircle, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function HomeContent() {
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const features = [
    { icon: Award,      title: t.features.expertTitle, body: t.features.expertBody },
    { icon: PlayCircle, title: t.features.paceTitle,   body: t.features.paceBody },
    { icon: Shield,     title: t.features.secureTitle,  body: t.features.secureBody },
  ];

  const coachStats = [
    { stat: "10+", label: t.coach.statYears },
    { stat: "500+", label: t.coach.statStudents },
    { stat: "3",   label: t.coach.statCourses },
  ];

  return (
    <main className="flex-1 bg-zinc-950 text-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100dvh-4rem)] flex items-center overflow-hidden">

        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)" }}
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-[560px]">

            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden />
              <span className="text-red-400 text-sm font-medium tracking-wide">
                {t.hero.eyebrow}
              </span>
            </div>

            <h1 className="text-[4rem] md:text-[5.5rem] font-black leading-[0.95] tracking-tight mb-6">
              {t.hero.line1}<br />
              {t.hero.line2}<br />
              <span className="text-red-500">{t.hero.line3}</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-[440px]">
              {t.hero.body}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center h-12 px-7 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                {t.hero.browseCourses}
              </Link>
              {!loading && !user && (
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center h-12 px-7 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-semibold rounded-xl border border-zinc-700 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  {t.hero.createAccount}
                </Link>
              )}
            </div>

            {/* Social proof strip */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-zinc-800">
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">{t.hero.statCourses}</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" aria-hidden />
              <div>
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">{t.hero.statLessons}</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" aria-hidden />
              <div>
                <p className="text-2xl font-bold text-white">HD</p>
                <p className="text-xs text-zinc-500 mt-0.5 uppercase tracking-wider">{t.hero.statQuality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Boxer image */}
        <div
          className="absolute right-0 top-0 h-full w-[52%] pointer-events-none select-none flex items-end"
          aria-hidden
        >
          <Image
            src="/hero-boxer-v2.png"
            alt=""
            width={900}
            height={1152}
            className="object-contain object-bottom h-[95%] w-auto opacity-90 brightness-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 py-24" aria-label="Platform features">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {t.features.heading}
            </h2>

            {/* Level progression */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {[
                { label: "Beginner",     color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8" },
                { label: "Intermediate", color: "text-amber-400 border-amber-500/30 bg-amber-500/8" },
                { label: "Advanced",     color: "text-red-400 border-red-500/30 bg-red-500/8" },
              ].map((level, i) => (
                <div key={level.label} className="flex items-center gap-2">
                  {i > 0 && <div className="w-4 h-px bg-zinc-700" aria-hidden />}
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${level.color}`}>
                    {level.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature rows */}
          <div className="divide-y divide-zinc-800/60">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group flex flex-col sm:flex-row sm:items-center gap-6 py-8 hover:bg-zinc-900/40 px-4 -mx-4 rounded-2xl transition-colors duration-200"
                >
                  {/* Number */}
                  <span className="text-5xl font-black text-red-500/20 group-hover:text-red-500/40 transition-colors duration-200 leading-none select-none w-16 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-red-500/30 group-hover:bg-red-500/5 flex items-center justify-center flex-shrink-0 transition-colors duration-200" aria-hidden>
                    <Icon className="w-5 h-5 text-red-400" strokeWidth={1.75} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{f.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">{f.body}</p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-5 h-5 text-zinc-700 group-hover:text-red-500 transition-colors duration-200 flex-shrink-0 hidden sm:block"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Meet Your Coach ──────────────────────────────────── */}
      <section className="py-20 border-t border-zinc-800/60" aria-label="Meet your coach">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center gap-0">
            <div className="relative w-full md:w-[420px] flex-shrink-0 flex items-end justify-center h-[420px] md:h-[500px]">
              <Image
                src="/coach-v2.png"
                alt="Your boxing coach"
                width={480}
                height={600}
                className="object-contain object-bottom h-full w-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-zinc-900 hidden md:block" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent md:hidden" />
            </div>
            <div className="relative flex-1 px-8 pb-12 md:py-14 md:pr-12 text-center md:text-left">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">
                  {t.coach.eyebrow}
                </span>
                <a
                  href="https://www.instagram.com/alexander_boxing_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-red-500 hover:text-red-400 transition-colors duration-150"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {t.coach.line1}<br />
                <span className="text-red-500">{t.coach.line2}</span>
              </h2>
              <div className="text-zinc-400 text-base leading-relaxed mb-6 max-w-md space-y-4">
                {t.coach.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {coachStats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-white">{s.stat}</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800" style={{ minHeight: "520px" }}>

            {/* Red glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.15) 0%, transparent 60%)" }}
              aria-hidden
            />

            {/* Title — top center */}
            <div className="relative z-10 pt-14 text-center px-6">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {t.cta.heading}
              </h2>
            </div>

            {/* Boxer image — centered */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none" aria-hidden>
              <Image
                src="/cta-boxer.png"
                alt=""
                width={520}
                height={620}
                className="object-contain object-bottom h-[85%] w-auto opacity-90 brightness-110"
              />
              {/* Side fades */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-transparent to-zinc-900/80" />
              {/* Bottom fade into button area */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            {/* Button — bottom center, on top of image lower half */}
            <div className="absolute bottom-32 left-0 right-0 flex justify-center z-10">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center h-13 px-10 py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base rounded-xl transition-colors duration-150 shadow-lg shadow-red-900/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                {t.cta.button}
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
