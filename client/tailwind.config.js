/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'primary-light': 'var(--primary-light)',
        'dark-bg': 'var(--dark-bg)',
        'dark-surface': 'var(--dark-surface)',
        'dark-surface-2': 'var(--dark-surface-2)',
        'dark-text': 'var(--dark-text)',
        'dark-text-secondary': 'var(--dark-text-secondary)',
        'dark-border': 'var(--dark-border)',
      },
    },
  },
  plugins: [],
};