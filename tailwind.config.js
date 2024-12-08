/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'brand': {
          'gold': '#B8860B',
          'light': '#DAA520',
          'lighter': '#FFD700',
        }
      }
    }
  },
  plugins: [],
}

