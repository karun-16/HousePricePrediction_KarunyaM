import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07110f",
        panel: "#0d1b18",
        mint: "#73f2bd",
        cyan: "#7dd3fc",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(48, 211, 153, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;

