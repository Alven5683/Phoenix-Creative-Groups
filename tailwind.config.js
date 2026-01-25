/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f8cff',
          dark: '#3a6fd8',
        },
        secondary: {
          DEFAULT: '#a259ff',
        },
        accent: {
          blue: '#4f8cff',
          purple: '#a259ff',
          green: '#34d399',
          orange: '#fbbf24',
          pink: '#f472b6',
        },
        gray: {
          50: '#f8fafc',
          100: '#f3f6fb',
          200: '#e5e7eb',
          400: '#b0b3c6',
          700: '#6b7280',
          900: '#222257',
        },
        dark: '#101014',
        glass: 'rgba(255,255,255,0.08)',
        glassBorder: 'rgba(255,255,255,0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1.5rem', // 24px
        '2xl': '1.5rem',
        'lg': '1rem',   // 16px
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
      },
      backdropBlur: {
        glass: '14px',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};