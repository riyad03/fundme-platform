/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      sm: '640px',
      md: '830px',  
      lg: '1150px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}

