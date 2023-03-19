/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        'poster': '360px',
        'movie-info': '170px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
