/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.25)" },
      backgroundImage: {
        "soliduo-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgb(var(--brand) / .15), transparent 60%)",
      },
      borderRadius: { xl3: "1.5rem" },
    },
  },
  plugins: [],
};
