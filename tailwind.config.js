const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-page': 'radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(-10px)' },
          '25%': { transform: 'translateY(5px)' },
          "50%": { transform: 'translateY(-10px)' },
          "75%": { transform: 'translateY(5px)' },
          "100%": { transform: 'translateY(-10px)' }
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
    plugins: [

    ],
  }
}