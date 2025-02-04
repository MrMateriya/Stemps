import type {Config} from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/webPages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/UI/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "mobile": "358px",
      "mobile-laptop": "391px",
      "desktop": "1728px",
      // "sm": "640px",
      // "md": "768px",
      "lg": "1024px",
      // "xl": "1280px",
      // "2xl": "1536px",
    },
    extend: {
      colors: {
        "bl1": "#121212",
        "bl2": "#151515",
        "dark-gray": "#1C1C1C",

        "white": "#F3F3F3",
        "white-bg": "#FAFAFA",
        "light-gray": "#F0F0F0",
        "light-gray2": "#E1E1E1",
        "middle-gray": "#D1D1D1",
        "darkest-gray": "#CCCCCC",

        "violet-dark": "#8977f3",
        "violet-saturated": "#A59DFF",
      },
      fontFamily: {
        "montreal": "var(--font-PPNeueMontreal)",
      },
      lineHeight: {
        "normal-keyword": "normal",
      },
      fontSize: {
        "2.5xl": "1.625rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
