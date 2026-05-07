import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sage: "#7A8B6F",
        olive: "#5F6B4F",
        ivory: "#F8F6F2",
        beige: "#E9E2D8",
        brown: "#6A4B3A",
        petal: "#D9AAA9",
        blush: "#E8C9C5",
        ink: "#2D2A24"
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 90px rgba(122, 139, 111, 0.22)",
        glass: "0 24px 80px rgba(68, 54, 44, 0.12)",
        lift: "0 30px 90px rgba(95, 107, 79, 0.20)"
      },
      keyframes: {
        "slow-pan": {
          "0%, 100%": { transform: "scale(1.04) translate3d(0, 0, 0)" },
          "50%": { transform: "scale(1.1) translate3d(-1.4%, -1%, 0)" }
        },
        "soft-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        "slow-pan": "slow-pan 22s ease-in-out infinite",
        "soft-float": "soft-float 7s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
