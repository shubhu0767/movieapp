/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin', 'tailwind-scrollbar'),
    require('tailwind-scrollbar'),
    require('daisyui')
  ],
  variants: {
    display: ['responsive', 'group-hover', 'group-focus'],
  },
}
