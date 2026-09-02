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
        cream: "#F8F4EB",
        ink: "#301E12",
        taupe: "#776C62",
        orange: "#EB6F25",
        green: "#2D853C",
        sage: "#BED2BC",
        line: "#E0D8CC",
      },
      fontFamily: {
        headline: ['Georgia', 'Times New Roman', 'Times', 'serif'],
        ui: ['system-ui', 'Arial', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 18px 40px rgba(48, 30, 18, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
