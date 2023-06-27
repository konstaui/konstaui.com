module.exports = {
  content: [
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
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
        dark: {
          light: '#4e5157',
          DEFAULT: '#040912',
          dark: '#23272e'
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
