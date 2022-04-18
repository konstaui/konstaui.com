module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    camelcase: ['off'],
    'global-require': ['off'],
    'prefer-destructuring': ['off'],
    'prefer-object-spread': ['off'],
    'prefer-ob': ['off'],
    'no-nested-ternary': ['off'],
    'no-console': ['off'],
    'no-restricted-globals': ['off'],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['off'],
    'import/extensions': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/no-array-index-key': ['off'],
    'react/prop-types': ['off'],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-filename-extension': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/display-name': ['off'],
    'react/jsx-no-target-blank': ['off'],
    'react/no-unescaped-entities': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    '@next/next/no-img-element': ['off'],
  },
};
