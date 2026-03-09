import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAF9",
        accent: {
          DEFAULT: "#f97316",
          hover: "#ea6c0a",
          light: "#fff7ed",
        },
        neutral: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
          600: "#57534E",
          700: "#44403C",
          800: "#292524",
          900: "#1C1917",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#292524",
            a: {
              color: "#f97316",
              "&:hover": { color: "#ea6c0a" },
            },
            h1: { color: "#1C1917" },
            h2: { color: "#1C1917" },
            h3: { color: "#1C1917" },
            h4: { color: "#1C1917" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
