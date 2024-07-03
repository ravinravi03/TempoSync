/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#406835',
        'surface-tint': '#406835',
        'on-primary': '#FFFFFF',
        'primary-container':'#C1EFAF',
        'on-primary-container':'#012200',
        'secondary':'#54634D',
        'on-secondary':'#FFFFFF',
        'secondary-container':'#DFE8CC',
        'on-secondary-container':'#121F0E',
        'tertiary':'#386688',
        'on-tertiary':'#FFFFFF',
        'tertiary-container':'#BCEBEE',
        'on-tertiary-container':'#002021',
        'error':'#BA1A1A',
        'on-error':'#FFFFFF',
        'error-container':'#FFDAD6',
        'on-error-container':'#410002',
        'background':'#F8FBF0',
        'on-background':'#191D17',
        'spotify-green': '#1DB954',
      },
      fontFamily: {
        'press-start': ['Press Start 2P', 'cursive'],
      },
    },
  },
  plugins: [],
}
