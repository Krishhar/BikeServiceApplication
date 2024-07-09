/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightGray: '#71717A',
        btn:'4CAF50',
      },
      boxShadow: {
        'custom': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      width: {
        '30%':'30%',
        '40%': '40%',
        '66%':'66%',
        '80%':'80%'
      },
    },
  },
  plugins: [],
}