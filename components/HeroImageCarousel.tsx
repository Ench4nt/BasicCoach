"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLIDES = [
  { src: "/hero-boxer-v2.png", className: "opacity-90 brightness-125" },
  { src: "/coach-v2.png",      className: "opacity-80 invert brightness-150" },
  { src: "/cta-boxer.png",     className: "opacity-85 brightness-110" },
];

export default function HeroImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 flex items-end transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden
        >
          <Image
            src={slide.src}
            alt=""
            width={900}
            height={1152}
            className={`object-contain object-bottom h-[95%] w-auto ${slide.className}`}
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
      ))}
    </>
  );
}
