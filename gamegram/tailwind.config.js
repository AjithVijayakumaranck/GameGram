/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark':'#111111',
        'secondary':'#232325',
        'main':'#BCFF01',
        'contrast':'#363636',
        'lightContrast':'#3A3A3E',
        'admin':'#b100fa'
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}