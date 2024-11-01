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
        background: "var(--background)",
        foreground: "var(--foreground)",
        whiteGray: "#BDBDBD",
        primary: {
          default: "#28292E",
          active: "#3A3B43",
          hover: "#202024",
        },
        secondary: {
          default: "#BA474A",
          active: "#DC565A",
          hover: "#9E393C",
        },
      },
      boxShadow: {
        glow: '0 0 15px 5px rgba(249, 17, 24, 1)',
      },
    },
  },
  plugins: [
  ],
};
export default config;
