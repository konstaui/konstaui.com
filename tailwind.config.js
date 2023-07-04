module.exports = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
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
        dark: '#191513',
        'dark-text': '#DDDDDF',
        'dark-light': '#4e3b2f',
        'dark-code': '#2b221c',
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
