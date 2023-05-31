/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
    },
    colors: {
      main: "#603EB6",
      greyText: "#6B7280",
      error: "#EC6565",
      white: "#FFFFFF",
      black: "#131313",
      blacktext: "#0A001F",
      border: "#D1D5DB",
      inputBorder: "#F3F4F6",
      text: "#0A001F",
    },
  },
  plugins: [],
};
