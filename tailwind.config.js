module.exports = {
  purge: ['./src/**/*.{html,js}', './index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        yellow: {
          DEFAULT: '#FBBF24', // Custom yellow color
        },
        black: {
          DEFAULT: '#000000', // Custom black color
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};