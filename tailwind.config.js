module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px'
      },
      fontFamily: {

      },
      colors: {

      },
      padding: {},
      margin: {},
      fontSize: {

      }
    }
  },
  shortcuts: {

  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
