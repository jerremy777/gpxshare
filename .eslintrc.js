module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    google: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    jsx: 'react',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    // Allow jsx syntax in .tsx files
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts', '.jsx', '.js'] }],
    // Disable import extensions rule
    'import/extensions': 'off',
    // Disable import/no-resolved rule for ts and tsx files
    'import/no-unresolved': 'off',
  },
};
