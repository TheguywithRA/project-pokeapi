/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a202c', 
        darkText: '#ffffff',
        lightBackground: '#edf2f7',
        lightText: '#000000',
      },
    },
  },
  plugins: [],
}
