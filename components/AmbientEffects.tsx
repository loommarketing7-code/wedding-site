"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const petals = [
  { left: 5, size: 13, delay: 0, duration: 19, drift: 34 },
  { left: 12, size: 9, delay: 4, duration: 22, drift: -26 },
  { left: 22, size: 15, delay: 2, duration: 20, drift: 36 },
  { left: 31, size: 10, delay: 7, duration: 23, drift: -32 },
  { left: 43, size: 12, delay: 1, duration: 21, drift: 28 },
  { left: 52, size: 8, delay: 6, duration: 24, drift: -24 },
  { left: 63, size: 14, delay: 3, duration: 20, drift: 38 },
  { left: 74, size: 10, delay: 8, duration: 22, drift: -30 },
  { left: 84, size: 12, delay: 5, duration: 25, drift: 26 },
  { left: 94, size: 9, delay: 9, duration: 21, drift: -34 }
];

export function AmbientEffects() {
  const reduceMotion = useReducedMotion();
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduceMotion]);

  return (
    <>
      <div className="cinematic-grain" aria-hidden="true" />
      {!reduceMotion && (
        <>
          <div
            className="cursor-glow hidden md:block"
            style={{ transform: `translate3d(${cursor.x - 170}px, ${cursor.y - 170}px, 0)` }}
            aria-hidden="true"
          />
          <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
            {petals.map((petal, index) => (
              <motion.span
                key={`${petal.left}-${index}`}
                className="petal"
                style={{
                  left: `${petal.left}%`,
                  width: petal.size,
                  height: petal.size * 1.45
                }}
                animate={{
                  y: ["-12vh", "112vh"],
                  x: [0, petal.drift, petal.drift * -0.35, petal.drift * 0.2],
                  rotate: [0, 90, 210, 330]
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
