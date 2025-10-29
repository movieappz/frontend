/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {
      colors: {
        light: {
          text: '#344e41',
          background: '#ecf39e',
          border: '#4f772d',
        },
        dark: {
          text: '#70012b',
          background: '#000000',
          border: '#4b011d',
        },
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}