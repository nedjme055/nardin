/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
          700: '#4263eb',
          800: '#3b5bdb',
          900: '#364fc7',
        },
        dark: {
          50: '#1a1f3a',
          100: '#151933',
          200: '#11152d',
          300: '#0d1027',
          400: '#0a0d21',
          500: '#07091b',
          600: '#050715',
          700: '#03040f',
          800: '#020309',
          900: '#010103',
        },
        gold: {
          300: '#f5d98e',
          400: '#f0cb5e',
          500: '#d4a843',
          600: '#b8922f',
        },
        accent: '#10b981',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
