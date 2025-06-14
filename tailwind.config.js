/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F8FAFC',
          100: '#F1F5F9',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3730A3',
        },
        violet: {
          400: '#8B5CF6',
          500: '#7C3AED',
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}