/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021
  },
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    '@vue/standard',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    // 'plugin:vuejs-accessibility/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'sonarjs',
    'simple-import-sort',
    'vue',
    'vuejs-accessibility',
    'prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/component-name-in-template-casing': 'off',

    'prettier/prettier': ['warn'],

    '@typescript-eslint/no-unused-vars': 'off',
    'vue/v-on-event-hyphenation': ['error', 'never']
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/*.spec.{j,t}s?(x)',
        '**/*.test.{j,t}s?(x)',
        './tests/unit/setup.ts'
      ],
      env: {
        jest: true
      },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['.eslintrc.js', '*.config.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'unicorn/prefer-module': 'off'
      }
    },
    {
      files: ['*.tsx'],
      rules: {}
    },
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
