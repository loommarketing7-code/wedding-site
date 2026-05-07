"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";

const fieldClass =
  "peer w-full rounded-lg border border-sage/18 bg-white/42 px-4 pb-3 pt-7 text-sm text-ink outline-none transition placeholder:text-transparent focus:border-sage focus:bg-white/64 focus:shadow-[0_0_0_4px_rgba(122,139,111,0.12)]";

const labelClass =
  "pointer-events-none absolute left-4 top-2 text-xs font-semibold text-olive transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/45 peer-focus:top-2 peer-focus:text-xs peer-focus:text-olive";

function FloatingInput({
  id,
  label,
  type = "text",
  required = false,
  min,
  max
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  min?: number;
  max?: number;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        required={required}
        min={min}
        max={max}
        className={fieldClass}
      />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  );
}

export function RSVPSection() {
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    formRef.current?.reset();
    window.setTimeout(() => setSubmitted(false), 5200);
  };

  return (
    <section id="rsvp" className="section-padding relative overflow-hidden bg-beige/45" aria-labelledby="rsvp-title">
      <div className="site-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">RSVP</p>
          <h2 id="rsvp-title" className="mt-4 font-serif text-5xl font-semibold leading-tight text-brown sm:text-6xl">
            Let us know you will be there.
          </h2>
          <p className="mt-5 leading-8 text-ink/70">
            Your presence is the loveliest gift. Kindly respond so every seat, toast, and candlelit detail is ready.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="glass-panel relative overflow-hidden rounded-lg p-5 sm:p-8">
            <span className="botanical-corner right-6 top-6" aria-hidden="true" />
            <form ref={formRef} onSubmit={handleSubmit} className="relative grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingInput id="fullName" label="Full Name" required />
                <FloatingInput id="email" label="Email" type="email" required />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingInput id="guests" label="Number of Guests" type="number" required min={1} max={10} />
                <div className="relative">
                  <select
                    id="attendance"
                    name="attendance"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-sage/18 bg-white/42 px-4 pb-3 pt-7 text-sm text-ink outline-none transition focus:border-sage focus:bg-white/64 focus:shadow-[0_0_0_4px_rgba(122,139,111,0.12)]"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="joyfully-attending">Joyfully attending</option>
                    <option value="sending-love">Sending love from afar</option>
                  </select>
                  <label htmlFor="attendance" className="absolute left-4 top-2 text-xs font-semibold text-olive">
                    Attendance Confirmation
                  </label>
                </div>
              </div>

              <FloatingInput id="dietary" label="Dietary Preferences" />

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message for the Couple"
                  rows={5}
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="message" className={labelClass}>
                  Message for the Couple
                </label>
              </div>

              <button type="submit" className="luxury-button mt-2 border-sage bg-sage text-ivory hover:bg-olive">
                <Send size={16} />
                Celebrate With Us
              </button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="absolute inset-5 flex items-center justify-center rounded-lg border border-sage/25 bg-ivory/90 text-center shadow-glow backdrop-blur-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  role="status"
                >
                  <div className="max-w-sm px-6">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.12, type: "spring", stiffness: 180, damping: 14 }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-ivory"
                    >
                      <Check size={25} />
                    </motion.div>
                    <p className="mt-5 font-serif text-3xl font-semibold text-brown">Your RSVP has been received.</p>
                    <p className="mt-3 text-sm leading-7 text-ink/68">
                      Thank you for adding your warmth toThank you for adding your warmth to Muhammed Kamal and Fathima&#39;s celebration. Cahaya and Kal's celebration.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
