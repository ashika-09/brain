/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#e0e7fe",
          400:"#c0ceff",
          500:"#3e38a7",
          600:"#5046f8",
          700:"#5046e4"
        }
      },
      fontFamily: {
        janeLight: ["janeLight", 'sans-serif'],
      },
    },
  },
  plugins: [],
}