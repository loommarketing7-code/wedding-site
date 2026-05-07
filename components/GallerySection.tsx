"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { galleryImages } from "@/lib/data";

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (selected === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") setSelected((value) => (value === null ? value : (value + galleryImages.length - 1) % galleryImages.length));
      if (event.key === "ArrowRight") setSelected((value) => (value === null ? value : (value + 1) % galleryImages.length));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const selectedImage = selected === null ? null : galleryImages[selected];

  return (
    <section id="gallery" className="section-padding overflow-hidden" aria-labelledby="gallery-title">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="section-eyebrow">Gallery</p>
          <h2 id="gallery-title" className="mt-4 font-serif text-5xl font-semibold leading-tight text-brown sm:text-6xl">
            A soft editorial glimpse of the day.
          </h2>
          <p className="mt-5 leading-8 text-ink/70">
            Florals, portraits, ceremony details, and countryside romance gathered in a magazine-style gallery.
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={(index % 3) * 0.06} className="masonry-column mb-5">
              <button
                type="button"
                className="group relative block w-full overflow-hidden rounded-lg bg-beige shadow-glass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
                style={{ height: `clamp(300px, ${image.height / 10}vw, ${image.height}px)` }}
                onClick={() => setSelected(index)}
                aria-label={`Open ${image.title} image`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(45,42,36,0.62))] opacity-80 transition group-hover:opacity-95" />
                <span className="absolute bottom-5 left-5 font-serif text-2xl font-semibold text-ivory drop-shadow">
                  {image.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedImage.title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/82 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative h-[82vh] w-full max-w-5xl overflow-hidden rounded-lg border border-ivory/25 bg-ink shadow-glow"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="92vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,42,36,0.12),transparent_50%,rgba(45,42,36,0.58))]" />
              <p className="absolute bottom-6 left-6 font-serif text-3xl font-semibold text-ivory">{selectedImage.title}</p>

              <button
                type="button"
                aria-label="Close gallery"
                title="Close"
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/35 bg-ivory/12 text-ivory backdrop-blur-xl transition hover:bg-ivory/22"
                onClick={() => setSelected(null)}
              >
                <X size={19} />
              </button>
              <button
                type="button"
                aria-label="Previous gallery image"
                title="Previous"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/35 bg-ivory/12 text-ivory backdrop-blur-xl transition hover:bg-ivory/22"
                onClick={() => setSelected((value) => (value === null ? value : (value + galleryImages.length - 1) % galleryImages.length))}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next gallery image"
                title="Next"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/35 bg-ivory/12 text-ivory backdrop-blur-xl transition hover:bg-ivory/22"
                onClick={() => setSelected((value) => (value === null ? value : (value + 1) % galleryImages.length))}
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
