/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0a0a0a",
        "surface-raised": "#121212",
        primary: "#00F5FF",
        "primary-dim": "rgba(0, 245, 255, 0.15)",
        secondary: "#8A2BE2",
        "text-main": "#FAFAFA",
        "text-muted": "#A1A1AA",
        "text-dim": "#52525B",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-.04em",
        tight: "-.02em",
        widest: ".15em",
      },
    },
  },
  plugins: [],
};

