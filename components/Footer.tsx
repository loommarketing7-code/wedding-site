import { Facebook, Heart, Instagram, Mail } from "lucide-react";
import { invitation } from "@/lib/data";

const socials = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Email", href: "mailto:hello@example.com", Icon: Mail }
];

export function Footer() {
  return (
    <footer className="relative z-10 bg-ivory px-5 py-12 text-center">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto mb-8 h-px w-full max-w-xl bg-[linear-gradient(90deg,transparent,rgba(122,139,111,0.42),transparent)]" />
        <p className="font-script text-5xl text-brown">{invitation.couple}</p>
        <p className="mt-3 font-serif text-2xl font-semibold text-olive">December 08, 2026</p>

        <div className="mt-7 flex justify-center gap-3">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sage/22 bg-white/55 text-sage transition hover:-translate-y-1 hover:border-sage hover:bg-sage hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="mt-7 inline-flex items-center justify-center gap-2 text-sm text-ink/62">
          Made with love <Heart size={15} className="fill-petal text-petal" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
