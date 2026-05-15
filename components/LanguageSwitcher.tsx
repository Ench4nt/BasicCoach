"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Lang } from "@/lib/translations";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "he", label: "HE" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-lg bg-zinc-800/60 p-0.5">
      {options.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-zinc-400 ${
            lang === code
              ? "bg-zinc-700 text-white"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
