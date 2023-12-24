/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        'slide-in-bck-center': 'slide-in-bck-center 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'slide-in-bck-center': {
          '0%': {
            transform: 'translateZ(600px)',
            opacity: '0',
          },
          to: {
            transform: 'translateZ(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
})
