import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ubuntu)", "Ubuntu", "sans-serif"],
        display: ["var(--font-display)", "Manrope", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        palette: {
          900: "#1E3146",
          800: "#3F5E7B",
          400: "#8EA9C3",
          100: "#D9E0E7",
          50: "#FFFFFF",
        },
        ink: {
          950: "#0A0E14",
          900: "#0E141B",
          800: "#141B24",
        },
        accent: {
          400: "#3FA6FF",
          500: "#1E8BFF",
          600: "#0F6FE0",
        },
      },
      keyframes: {
        "story-progress": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        "story-progress": "story-progress linear forwards",
        "fade-in": "fade-in 700ms ease-out both",
        "slow-zoom": "slow-zoom 8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
