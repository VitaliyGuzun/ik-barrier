/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ikbrand: {
          light: '#D29487',
          DEFAULT: '#BD624F',
          dark: '#8B4334',
        },
      },
    },
  },
  plugins: [],
}
