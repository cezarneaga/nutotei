module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-1": "#333",
      },
      height: {
        144: "36rem",
        150: "37.5rem",
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
