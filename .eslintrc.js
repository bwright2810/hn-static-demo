module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next/core-web-vitals',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/function-component-definition': [0],
    'react/jsx-props-no-spreading': [0],
    'linebreak-style': [0],
    'import/extensions': [0],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'max-len': ['error', { code: 160 }],
    'jsx-a11y/anchor-is-valid': [0],
  },
  globals: {
    React: true,
  },
};
