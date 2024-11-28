/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto-Regular", "sans-serif"],
      },
      colors: {
        primary: {
          blue: "#4169E1",
          teal: "#20B2AA",
        },
        accent: {
          green: "#3CB371",
        },
        background: {
          start: "#F0F8FF",
          end: "#E0FFF0",
        },
      },
    },
  },
  plugins: [],
};
