/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#e4e0d3',
        'paper-dim': 'hsl(38 16% 89%)',
        ink: 'hsl(0 0% 5%)',
        'ink-soft': 'hsl(0 0% 18%)',
        red: 'hsl(0 85% 49%)',
        /** Same hue as `red`, darkened for small bold uppercase labels on the
         * paper background, where the brighter red falls short of 4.5:1 contrast. */
        'red-label': 'hsl(0 85% 42%)',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        sans: ['Archivo', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.22, 1, .36, 1)',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
