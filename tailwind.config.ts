import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#143D2C",
          dark: "#0F3D24",
          950: "#0C2A1D",
        },
        lime: {
          DEFAULT: "#B9F44F",
          bright: "#ABFF60",
        },
        ink: "#1A1A1A",
        mist: "#F4F6F5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(20, 61, 44, 0.06), 0 8px 24px rgba(20, 61, 44, 0.06)",
        card: "0 1px 2px rgba(20,61,44,0.04), 0 4px 16px rgba(20,61,44,0.08)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
