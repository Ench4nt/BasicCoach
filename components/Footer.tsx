"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="text-lg font-black tracking-tight">
              <span className="text-red-500">Box</span>
              <span className="text-white">IQ</span>
            </Link>
            <p className="text-zinc-500 text-sm mt-2 max-w-[220px] leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              {t.footer.platform}
            </p>
            <Link href="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
              {t.nav.courses}
            </Link>
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
              {t.nav.pricing}
            </Link>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              {t.footer.legal}
            </p>
            <Link href="/legal/terms" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
              {t.footer.terms}
            </Link>
            <Link href="/legal/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
              {t.footer.privacy}
            </Link>
            <Link href="/legal/refund" className="text-sm text-zinc-400 hover:text-white transition-colors duration-150">
              {t.footer.refund}
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="text-zinc-600 text-xs">{t.footer.paddle}</p>
        </div>
      </div>
    </footer>
  );
}
