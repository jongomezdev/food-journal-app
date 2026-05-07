/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/**/*.{js,jsx,ts,tsx}",
    "./src/renderer/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        breakfast: '#f59e0b', // amber
        lunch: '#3b82f6',     // blue
        dinner: '#8b5cf6',    // purple
        snack: '#ec4899',     // pink
      }
    },
  },
  plugins: [],
}
