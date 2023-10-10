/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/*.hbs'],
  theme: {
    extend: {
      colors: {
        primary: '#111727',
        secondary: '#e3e7eb',
      },
    },
  },
  plugins: [],
};
