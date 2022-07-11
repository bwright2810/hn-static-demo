/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['emerald', {
      light: {
        ...require('daisyui/src/colors/themes')['[data-theme=light]'],
        primary: 'blue',
        'primary-focus': 'mediumblue',
      },
    }],
  },
};
