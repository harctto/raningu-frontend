const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orangemain: '#FE6849',
        lightorange: '#ff8269',
        bluemain: '#6078D6',
        whitemain: '#FAF2EE',
        greenmain: '#406341',
        graymain: '#E3DCD9'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      padding: ['hover','active'],
      margin: ['hover','active'],
      borderRadius: ['hover','active'],
      transitionDuration: ['hover','active'],
      transitionTimingFunction: ['hover', 'active'],
      fontSize: ['hover', 'active']
    },
  },
  plugins: [],
}

  