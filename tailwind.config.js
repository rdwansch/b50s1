/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/*.hbs', './src/views/partials/*.hbs'],
  theme: {
    extend: {
      colors: {
        // primary: '#111727',
        // secondary: '#e3e7eb',
        secondary: '#dddddd',
        primary: '#141414',
        tertiary: '#fe4b05',
      },
      screens: {
        xs: '540px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
