import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#090D16",
        obsidian: "#0F172A",
        champagne: "#F7E7B4",
        bullion: "#D6A84F",
        vellum: "#F8FAFC"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        aureate: "0 0 52px rgba(214, 168, 79, 0.2)",
        glass: "0 28px 90px rgba(0, 0, 0, 0.38)"
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #FFF7D6 0%, #D6A84F 38%, #8A641C 78%, #F7E7B4 100%)",
        "radial-aura":
          "radial-gradient(circle at 50% 50%, rgba(214, 168, 79, 0.22), rgba(9, 13, 22, 0) 62%)",
        "velvet-noise":
          "linear-gradient(115deg, rgba(255,255,255,0.032) 0 1px, transparent 1px 12px)"
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)", opacity: "0.48" },
          "50%": { transform: "translate3d(28px, -22px, 0) scale(1.1)", opacity: "0.78" }
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" }
        }
      },
      animation: {
        aurora: "aurora 13s ease-in-out infinite",
        sheen: "sheen 3.4s ease-in-out infinite",
        float: "float 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
