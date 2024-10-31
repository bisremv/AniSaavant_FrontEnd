const { link } = require('fs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        md: '876px',  // Increased by 100px (default is 768px)
        lg: '1194px',  // Increased by 100px (default is 1024px)
      },
      colors: {
        'primary': '#5a2e98',
        'secondary': '#6735ae',
        'hover': '#8258bd',
        "link":'#8258BD',
        "background": {
          50: '#242424',
          100: '#1c1c1c',
          200: '#0e0e0e',

        },
        'text-grey': {
          50: '#ffffff',
          100:'#bbbbbb',
          200: '#666666',
        }

      },
      fontFamily: {
        "main": ['Nunito'],
        "header": ['Alumni Sans'],
        "body": ['Roboto'],
      },
      dropShadow: {
        'purple': '0 2px 3px rgba(90, 46, 152, 0.8)',
      'light-white': '0 4px 6px rgba(255, 255, 255, 0.2)', // Light white shadow
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('daisyui'),
  ],
}

