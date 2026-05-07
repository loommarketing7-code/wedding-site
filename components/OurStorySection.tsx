"use client";

import { Gem, Heart, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { galleryImages, storyMoments } from "@/lib/data";

export function OurStorySection() {
  return (
    <section id="story" className="section-padding relative overflow-hidden">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16">
        <Reveal className="relative min-h-[570px]">
          <div className="absolute left-0 top-8 w-[72%] overflow-hidden rounded-lg shadow-lift">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              width={900}
              height={1120}
              sizes="(min-width: 1024px) 42vw, 82vw"
              className="h-[460px] w-full object-cover sm:h-[560px]"
            />
          </div>
          <div className="glass-panel absolute bottom-7 right-0 w-[58%] overflow-hidden rounded-lg p-3">
            <Image
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              width={680}
              height={760}
              sizes="(min-width: 1024px) 26vw, 58vw"
              className="h-[250px] w-full rounded-lg object-cover sm:h-[330px]"
            />
          </div>
          <div className="glass-panel absolute right-8 top-0 max-w-[230px] rounded-lg p-5 text-brown">
            <Leaf className="mb-4 text-sage" size={24} />
            <p className="font-serif text-2xl font-semibold leading-tight">A countryside promise, gathered in bloom.</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="section-eyebrow">Our Story</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-brown sm:text-6xl">
              A love that feels like late afternoon light.
            </h2>
            <p className="mt-6 text-base leading-8 text-ink/72">
              Cahaya and Kal found each other in the gentle in-between: quiet walks, handwritten notes,
              shared coffee, and the kind of laughter that makes a room feel warmer. Their wedding is an
              invitation into that feeling, a day shaped by garden florals, candlelit tables, and the people
              who have held their story with care.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 glass-panel relative rounded-lg p-7">
            <Sparkles className="absolute right-6 top-6 text-petal" size={22} />
            <p className="font-serif text-3xl italic leading-snug text-brown">
              "Some promises are not spoken loudly. They are tended gently, season after season."
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4">
            {storyMoments.map((moment, index) => {
              const Icon = index === 0 ? Heart : index === 1 ? Gem : Sparkles;
              return (
                <Reveal key={moment.title} delay={index * 0.08}>
                  <article className="glass-panel group relative overflow-hidden rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <span className="botanical-corner right-4 top-4" aria-hidden="true" />
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage/12 text-sage">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-brown">{moment.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-olive">{moment.date}</p>
                        <p className="mt-3 leading-7 text-ink/70">{moment.copy}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
