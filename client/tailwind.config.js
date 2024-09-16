/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'manoa-green': '#024731',
      }
    },
  },
  plugins: [
    require('daisyui')
  ]
};
