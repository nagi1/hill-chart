/**
 * @type {import('eslint').ESLint.Options}
 */
module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint-config-ns-ts-base'],
  rules: {
    'comma-style': 'warn',
    'comma-dangle': 'off',
    'no-param-reassign': 'off',
    'func-names': 'off',
    'jest/prefer-strict-equal': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/require-top-level-describe': 'off',
    'jest/no-hooks': 'off',
    'jest/no-conditional-expect': 'off',
    '@typescript-eslint/no-this-alias': ['error', { allowedNames: ['self'] }],
  },
};
