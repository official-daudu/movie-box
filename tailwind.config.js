/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: "#E50914",
          black: "#141414",
          white: "#FFFFFF",
          gray: "#B3B3B3",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        body: ["Avenir", "System"],
      },
    },
  },
  plugins: [],
};
