module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1440px'
      },
      backgroundImage: {
        'header-lg': "url('/assets/desktop/bg-pattern-header.svg')",
        'logo-lg': "url('/assets/desktop/logo.svg')"
      },
      fontFamily: {},
      colors: {},
      padding: {},
      margin: {},
      fontSize: {}
    }
  },
  shortcuts: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
