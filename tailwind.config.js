/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
      screens: {
        sm: '640px',
        md: '768px',
        nb: '1366px',   // 💻 notebooks
        pc: '1600px',   // 🖥️ desktops
        xl: '1920px',   // 🧭 monitores grandes
      },
    },
    plugins: [],
  }
  