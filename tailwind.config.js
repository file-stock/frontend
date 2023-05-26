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
      animation: {
        scrollLeft: "scrollLeft 10s linear infinite",
        scrollRight: "scrollRight 10s linear infinite",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
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
