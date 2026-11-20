"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Orchestratore delle animazioni allo scroll.
 * - [data-reveal]            fade + slide
 * - [data-reveal="mask"]     maschera fotografica che si apre
 * - [data-words]             text reveal parola per parola
 * - [data-parallax="0.15"]   parallax controllato
 * Rispetta prefers-reduced-motion.
 */
export function Motion() {
  const pathname = usePathname();

  // Smooth scroll (solo se il movimento è consentito e su puntatori fini)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo(0, 0);
    (window as unknown as { __lenis?: Lenis }).__lenis?.scrollTo(0, { immediate: true });

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const words = gsap.utils.toArray<HTMLElement>("[data-words]");
      const parallax = gsap.utils.toArray<HTMLElement>("[data-parallax]");

      if (reduced) {
        gsap.set(reveals, { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" });
        words.forEach((el) => gsap.set(el.querySelectorAll(".w > span"), { y: 0 }));
        return;
      }

      reveals.forEach((el) => {
        const delay = Number(el.dataset.delay ?? 0);
        if (el.dataset.reveal === "mask") {
          const img = el.querySelector("[data-mask-inner]");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.out", delay });
          if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, "<");
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: "power3.out",
              delay,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        }
      });

      words.forEach((el) => {
        const spans = el.querySelectorAll(".w > span");
        const immediate = el.dataset.words === "now";
        gsap.to(spans, {
          y: 0,
          duration: 1.15,
          ease: "expo.out",
          stagger: 0.055,
          delay: immediate ? 0.25 : 0,
          scrollTrigger: immediate ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      });

      parallax.forEach((el) => {
        const amount = Number(el.dataset.parallax ?? 0.15);
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
