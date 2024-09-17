module.exports = {
  content: [
    "./src/Footer.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'uh-green': '#014731', // Example UH Manoa green color
      },
    },
  },
  plugins: [require('daisyui')],
}
