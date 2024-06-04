import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#38bdf8",
      dark: "#131318",
      white: "#ffffff",
      grey: "#d8e2ef",
      darkgrey: "#ffffff25",
      green: "#50c39e",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
      "2xl": "1680px",
    },
  },
  plugins: [],
};
export default config;
