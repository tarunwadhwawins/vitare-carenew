module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 7,
  },
  
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  rules: {
     //'no-unused-vars': 'warn',
    //  'comma-dangle': 'off',
    // 'class-methods-use-this': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/extensions': 'off',
    // 'implicit-arrow-linebreak': 'off',
    // 'import/prefer-default-export': 'off',
    // "vue/no-multiple-template-root": "off",
    // "vue/valid-template-root": "off",
    // "vue/no-v-model-argument": 'off',
    // "@typescript-eslint/no-explicit-any": "off",
     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //  'vue/script-setup-uses-vars': 'error',
  }
  
}
