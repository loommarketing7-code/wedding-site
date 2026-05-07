"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CalendarPlus, Eye, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { invitation } from "@/lib/data";

const elegantEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroItems: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.18 }
  }
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: elegantEase }
  }
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let active = true;
    let context: ReturnType<typeof gsap.context> | undefined;

    const setupGsap = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!active) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.to(bgRef.current, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        gsap.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.05,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, sectionRef);
    };

    setupGsap();

    return () => {
      active = false;
      context?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-olive text-ivory"
      aria-label="Wedding invitation hero"
    >
      <div ref={bgRef} className="absolute inset-0 scale-105">
        <Image
          src={invitation.heroImage}
          alt="Outdoor luxury wedding venue with a floral arch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,37,28,0.36),rgba(45,42,36,0.34)_42%,rgba(45,42,36,0.74))]" />
      <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      <div
        ref={glowRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(248,246,242,0.18),rgba(217,170,169,0.20))] opacity-60"
        aria-hidden="true"
      />

      <motion.div
        variants={heroItems}
        initial="hidden"
        animate="visible"
        className="site-shell relative flex min-h-screen flex-col items-center justify-center px-5 pb-12 pt-28 text-center"
      >
        <motion.p variants={heroItem} className="max-w-2xl text-xs font-semibold uppercase text-ivory/90 sm:text-sm">
          {invitation.pretitle}
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mt-5 max-w-full font-script text-[4rem] leading-none text-ivory drop-shadow-[0_12px_40px_rgba(0,0,0,0.34)] sm:text-[7.5rem] lg:text-[10rem]"
        >
          {invitation.couple}
        </motion.h1>

        <motion.p variants={heroItem} className="mt-4 text-sm font-semibold uppercase text-ivory/90">
          {invitation.saveTheDate}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-8 grid w-full max-w-md grid-cols-3 overflow-hidden rounded-lg border border-ivory/35 bg-ivory/12 text-center shadow-glow backdrop-blur-2xl"
        >
          <div className="flex min-h-24 items-center justify-center border-r border-ivory/25 px-3 text-sm font-semibold uppercase">
            {invitation.month}
          </div>
          <div className="flex min-h-24 items-center justify-center border-r border-ivory/25 px-3 font-serif text-6xl font-semibold">
            {invitation.day}
          </div>
          <div className="flex min-h-24 items-center justify-center px-3 text-sm font-semibold uppercase">
            {invitation.year}
          </div>
        </motion.div>

        <motion.div variants={heroItem} className="mt-7 max-w-xl space-y-2 text-sm text-ivory/88 sm:text-base">
          <p>{invitation.weekdayTime}</p>
          <p className="font-serif text-2xl font-semibold text-ivory sm:text-3xl">{invitation.venue}</p>
          <p>{invitation.address}</p>
        </motion.div>

        <motion.div variants={heroItem} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <a href="#rsvp" className="luxury-button border-ivory bg-ivory text-brown hover:bg-beige">
            <Send size={16} />
            RSVP Now
          </a>
          <a href="#details" className="luxury-button border-ivory/45 bg-ivory/10 text-ivory backdrop-blur-xl hover:bg-ivory/20">
            <Eye size={16} />
            View Invitation
          </a>
          <a
            href={invitation.calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="luxury-button border-ivory/45 bg-ivory/10 text-ivory backdrop-blur-xl hover:bg-ivory/20"
          >
            <CalendarPlus size={16} />
            Add to Calendar
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
