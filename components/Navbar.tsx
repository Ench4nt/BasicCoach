"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, isClientConfigured } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    if (isClientConfigured) await signOut(auth);
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo + primary nav */}
        <div className="flex items-center gap-4">
          {/* Logo + Instagram grouped tightly */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="text-lg font-black tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 rounded"
              aria-label="BoxIQ — Home"
            >
              <span className="text-red-500">Box</span>
              <span className="text-white">IQ</span>
            </Link>

            <a
              href="https://www.instagram.com/alexander_boxing_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-red-500 hover:text-red-400 transition-colors duration-150"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-zinc-800 hidden sm:block" aria-hidden />

          <div className="hidden sm:flex items-center gap-1">
            <Link
              href="/courses"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
                pathname?.startsWith("/courses")
                  ? "text-white bg-zinc-800"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
              aria-current={pathname?.startsWith("/courses") ? "page" : undefined}
            >
              {t.nav.courses}
            </Link>

            <Link
              href="/pricing"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
                pathname === "/pricing"
                  ? "text-white bg-zinc-800"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
              aria-current={pathname === "/pricing" ? "page" : undefined}
            >
              {t.nav.pricing}
            </Link>
          </div>
        </div>

        {/* Right side */}
        <nav aria-label="Primary navigation" className="flex items-center gap-3">
          <LanguageSwitcher />

          {!loading && (
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName ?? "User avatar"}
                      className="w-8 h-8 rounded-full ring-2 ring-zinc-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-700"
                      aria-hidden
                    >
                      {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
                    </div>
                  )}

                  <span className="text-sm font-medium text-zinc-300 hidden sm:block">
                    {user.displayName
                      ? user.displayName.split(" ")[0]
                      : user.email?.split("@")[0]}
                  </span>

                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                  >
                    {t.nav.signOut}
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
                  >
                    {t.nav.signIn}
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center h-9 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-lg transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                  >
                    {t.nav.getStarted}
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
