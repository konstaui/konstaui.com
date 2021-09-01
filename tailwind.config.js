module.exports = {
  purge: [
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/layouts/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  mode: process.env.TAILWIND_JIT ? 'jit' : undefined,
  theme: {
    fontFamily: {
      sans:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      mono:
        'Menlo, Monaco, ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {
      colors: {
        primary: {
          light: '#ff7c29',
          DEFAULT: '#FF6300',
          dark: '#d65300',
        },
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
