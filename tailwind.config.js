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
        background: '#0a0a12',
        surface: 'rgba(24, 28, 44, 0.7)', // glassmorphism base
        accent: {
          violet: '#a259ff',
          cyan: '#00eaff',
          neon: '#39ff14',
        },
        glass: 'rgba(255,255,255,0.08)',
        glassBorder: 'rgba(255,255,255,0.18)',
        gray: {
          50: '#f8fafc',
          100: '#f3f6fb',
          200: '#e5e7eb',
          400: '#b0b3c6',
          700: '#6b7280',
          900: '#222257',
        },
        dark: '#101014',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Orbitron', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        glass: '1.5rem',
        xl: '1.5rem',
        '2xl': '1.5rem',
        lg: '1rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(34, 34, 87, 0.08)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
        '3d': '0 8px 32px 0 rgba(162,89,255,0.25), 0 1.5px 8px 0 rgba(0,234,255,0.10)',
      },
      backdropBlur: {
        glass: '14px',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #0a0a12 0%, #1a1a2e 60%, #a259ff 100%)',
        'card-gradient': 'linear-gradient(120deg, rgba(162,89,255,0.15) 0%, rgba(0,234,255,0.10) 100%)',
      },
          screens: {
            xs: '375px',
          },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};