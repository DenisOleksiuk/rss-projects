module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/webpack.*.js'] }],
    'max-len': ['error', { code: 120 }],
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'import/no-mutable-exports': 'off',
  },
};
