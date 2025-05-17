/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: '#d4ecff',
          violet: '#e4d9ff',
          rose: '#fbe0ee',
          gradientStart: '#fce3ff',
          gradientEnd: '#d4ecff',
        },
        gold: '#ffd700', // pour éventuels éléments premium / trophée
      },
    },
  },
  plugins: [],
};