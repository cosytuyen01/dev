/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "#f6f8f9",
        subBackground: "#ebeeef",
        bgFocus: "#d5dadc",
        borderColor: "rgba(255, 255, 255, 0.06)",
        primaryColor: "#6F6ADC",
        textColor: "#0e0e10",
        subText: "#6d7273",
        darkSubbg:"#171a1c"
      },
    },
  },
  plugins: [],
};
