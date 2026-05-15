import Link from "next/link";
import { CheckCircle, Zap } from "lucide-react";

const courses = [
  {
    id: "boxing-101",
    title: "Boxing 101: The Fundamentals",
    description: "Stance, footwork, and the four basic punches. Perfect for complete beginners.",
    price: 2999,
    level: "Beginner",
    lessons: 3,
    features: ["Proper stance & guard", "Jab, cross, hook & uppercut", "Footwork patterns", "Lifetime access"],
  },
  {
    id: "defense-basics",
    title: "Defense & Head Movement",
    description: "Master slipping, rolling, blocking, and parrying to avoid punches like a pro.",
    price: 3499,
    level: "Intermediate",
    lessons: 2,
    features: ["Slipping & rolling", "Blocking & parrying", "Head movement drills", "Lifetime access"],
  },
  {
    id: "combinations",
    title: "Combinations & Rhythm",
    description: "Chain punches fluently, find your rhythm, and develop ring generalship.",
    price: 3999,
    level: "Intermediate",
    lessons: 3,
    features: ["The 1-2 & extensions", "Body shot combos", "Ring movement", "Lifetime access"],
  },
];

const individualTotal = courses.reduce((sum, c) => sum + c.price, 0);
const bundlePrice = Math.round(individualTotal * 0.8);
const savings = individualTotal - bundlePrice;

export default function PricingPage() {
  return (
    <main className="flex-1 bg-zinc-950 text-white">

      {/* Header */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" aria-hidden />
            <span className="text-red-400 text-sm font-medium tracking-wide">Simple Pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Invest in your <span className="text-red-500">craft.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Buy once. Watch forever. No subscriptions, no hidden fees.
          </p>
        </div>
      </section>

      {/* Bundle card */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="relative rounded-3xl overflow-hidden border border-red-500/40 bg-zinc-900">
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.12) 0%, transparent 60%)" }}
            aria-hidden
          />

          <div className="relative px-8 py-10 flex flex-col md:flex-row items-center gap-8">
            {/* Badge */}
            <div className="flex-shrink-0 flex items-center gap-2 self-start md:self-center">
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                Best Value
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-black text-white mb-1">Complete Boxing Bundle</h2>
              <p className="text-zinc-400 text-sm mb-4">All 3 courses — everything from fundamentals to combinations.</p>
              <div className="flex flex-wrap gap-3">
                {courses.map((c) => (
                  <span key={c.id} className="flex items-center gap-1.5 text-zinc-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    {c.title.split(":")[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex-shrink-0 text-center md:text-right">
              <div className="flex items-baseline gap-2 justify-center md:justify-end mb-1">
                <span className="text-4xl font-black text-white">${(bundlePrice / 100).toFixed(2)}</span>
                <span className="text-zinc-500 line-through text-lg">${(individualTotal / 100).toFixed(2)}</span>
              </div>
              <p className="text-green-400 text-sm font-semibold mb-4">
                Save ${(savings / 100).toFixed(2)} (20% off)
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center h-11 px-7 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-xl transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Get the Bundle
              </Link>
              <p className="text-zinc-600 text-xs mt-2">Available soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Individual courses */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <p className="text-zinc-500 text-sm uppercase tracking-wider font-semibold mb-6">Or buy individually</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors duration-200"
            >
              <div className="px-6 pt-6 pb-5 flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 block">
                  {course.level}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{course.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{course.description}</p>
                <ul className="space-y-2">
                  {course.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-zinc-800 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-white">${(course.price / 100).toFixed(2)}</span>
                  <span className="text-zinc-500 text-sm">one-time</span>
                </div>
                <Link
                  href={`/courses/${course.id}`}
                  className="block w-full text-center h-10 leading-10 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-semibold rounded-xl transition-colors duration-150 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                >
                  Buy Course
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee note */}
        <div className="mt-10 text-center">
          <p className="text-zinc-500 text-sm">
            All purchases come with a{" "}
            <Link href="/legal/refund" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
              14-day money-back guarantee
            </Link>
            . No questions asked.
          </p>
        </div>
      </section>

    </main>
  );
}
