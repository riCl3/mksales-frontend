/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#008F37',
          blue: '#007CBD',
          dark: '#0A2540',
          darkBlue: '#014565',
          offWhite: '#C7C7C7',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-campton)', 'Campton', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['var(--font-poppins)', 'Poppins', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'xl': '72rem',
        '2xl': '80rem',
        '3xl': '90rem',
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
