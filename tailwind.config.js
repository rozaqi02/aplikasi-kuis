/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a3c6f',
        secondary: '#64ffda',
        accent: '#ffd700',
        dark: '#0a192f',
      },
    },
  },
  plugins: [],
}