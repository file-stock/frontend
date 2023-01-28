/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      main: "#603EB6",
      greyText: "#6B7280",
      error: "#EC6565",
      white: "#FFFFFF",
      black: "#131313",
      blacktext: "#0A001F",
      border: "#D1D5DB",
    },
  },
  plugins: [],
};
