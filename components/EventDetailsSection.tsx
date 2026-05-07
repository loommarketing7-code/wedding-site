"use client";

import { Landmark, MapPin, Shirt, Wine } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { eventCards } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  ceremony: Landmark,
  reception: Wine,
  dress: Shirt,
  venue: MapPin
};

export function EventDetailsSection() {
  return (
    <section id="details" className="section-padding relative overflow-hidden bg-beige/55">
      <div className="site-shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow">Event Details</p>
          <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-brown sm:text-6xl">
            Everything for a graceful arrival.
          </h2>
          <p className="mt-5 leading-8 text-ink/70">
            Ceremony, celebration, dress code, and venue details gathered in one quiet place.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {eventCards.map((card, index) => {
            const Icon = icons[card.icon];
            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="glass-panel group relative h-full overflow-hidden rounded-lg p-6 transition duration-500 hover:-translate-y-2 hover:shadow-lift">
                  <span className="botanical-corner right-5 top-5" aria-hidden="true" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(122,139,111,0.15),transparent)]" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-sage shadow-[0_12px_40px_rgba(95,107,79,0.16)] transition duration-300 group-hover:bg-sage group-hover:text-ivory">
                      <Icon size={24} />
                    </div>
                    <p className="mt-8 text-xs font-semibold uppercase text-olive">{card.kicker}</p>
                    <h3 className="mt-2 font-serif text-3xl font-semibold text-brown">{card.title}</h3>
                    <div className="mt-5 space-y-2 text-sm leading-7 text-ink/70">
                      {card.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
