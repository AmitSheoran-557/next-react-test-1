import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#656566",
        secondary: "#475467",
        blue: "#007BFF",
        lightBlack: "#14191C",
        lightGray: "#D0D5DD",
        lightWhite: "#FAFAFF",
      },
    },
  },
  plugins: [],
} satisfies Config;
