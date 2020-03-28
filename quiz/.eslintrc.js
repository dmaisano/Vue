module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    'vue/no-unused-vars': 'error',
    'no-console': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
  },
};
