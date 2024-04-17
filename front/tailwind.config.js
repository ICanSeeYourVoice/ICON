/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      primary: "#7BB7F7",
      sub: {
        0: "#7C8B9D",
      },
      pink: {
        0: "#FFA6AF",
      },
      red: {
        0: "#FF0000",
      },
      gray: {
        0: "#8C8C8C",
        1: "#C8C8C8",
        2: "#F3F3F3",
      },
      linear: {
        0: "#FFA6AF",
        100: "#8593FE",
      },
    },
    fontFamily: {
      main: ["NPSfont", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
