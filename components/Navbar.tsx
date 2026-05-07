"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { invitation } from "@/lib/data";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Story", href: "#story" },
  { label: "Event Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled ? "bg-ivory/88 shadow-[0_12px_40px_rgba(45,42,36,0.08)] backdrop-blur-2xl" : "bg-transparent"
      }`}
    >
      <nav className="site-shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <a
          href="#home"
          className={`font-script text-3xl transition-colors duration-300 ${
            scrolled ? "text-brown" : "text-ivory drop-shadow-[0_2px_18px_rgba(0,0,0,0.38)]"
          }`}
          aria-label="Cahaya and Kal wedding home"
        >
          {invitation.couple}
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-ink" : "text-ivory"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  scrolled ? "bg-sage" : "bg-ivory"
                }`}
              />
            </a>
          ))}
        </div>

        <a
          href="#rsvp"
          className={`luxury-button hidden lg:inline-flex ${
            scrolled
              ? "border-sage/35 bg-sage text-ivory hover:bg-olive"
              : "border-ivory/55 bg-ivory/10 text-ivory backdrop-blur-xl hover:bg-ivory/20"
          }`}
        >
          RSVP
        </a>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${
            scrolled
              ? "border-sage/30 bg-white/60 text-brown"
              : "border-ivory/45 bg-ivory/10 text-ivory backdrop-blur-xl"
          }`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mb-4 rounded-lg border border-white/60 bg-ivory/92 p-3 shadow-glass backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-5 py-4 text-sm font-semibold text-brown transition hover:bg-beige/70"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
