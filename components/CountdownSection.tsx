"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { invitation } from "@/lib/data";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(): TimeLeft {
  const target = new Date(invitation.targetDate).getTime();
  const distance = Math.max(0, target - Date.now());

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = [
    { label: "Days", value: timeLeft?.days },
    { label: "Hours", value: timeLeft?.hours },
    { label: "Minutes", value: timeLeft?.minutes },
    { label: "Seconds", value: timeLeft?.seconds }
  ];

  return (
    <section className="relative overflow-hidden py-24 text-ivory sm:py-32" aria-labelledby="countdown-title">
      <div className={`absolute inset-0 ${reduceMotion ? "" : "animate-slow-pan"}`}>
        <Image
          src={invitation.gardenImage}
          alt="Soft floral garden wedding atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,42,36,0.54),rgba(95,107,79,0.50),rgba(45,42,36,0.72))]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(248,246,242,0.96))]" />

      <div className="site-shell relative text-center">
        <Reveal>
          <p className="section-eyebrow text-ivory/86">Countdown</p>
          <h2 id="countdown-title" className="mx-auto mt-4 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            Counting the days until forever
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5" aria-live="polite">
          {values.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.07}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="border border-ivory/35 bg-ivory/12 p-5 shadow-glow backdrop-blur-2xl sm:p-7"
              >
                <p className="font-serif text-5xl font-semibold leading-none sm:text-6xl">
                  {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase text-ivory/78">{item.label}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
