/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9B6B9D',
        'primary-light': '#E5D1E6',
        'primary-dark': '#2D1832',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
      },
    },
  },
  plugins: [],
}
