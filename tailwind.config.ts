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
        cream: "#F4EFE6",
        ink: "#1A1612",
        taupe: "#776C62",
        orange: "#C45C26",
        green: "#2D853C",
        sage: "#BED2BC",
        line: "#E0D8CC",
      },
      fontFamily: {
        headline: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        ui: ['system-ui', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 18px 40px rgba(26, 22, 18, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
