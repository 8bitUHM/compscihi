/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'manoa-green': '#559e83',
      }
    },
  },
  plugins: [
    require('daisyui')
  ]
};
