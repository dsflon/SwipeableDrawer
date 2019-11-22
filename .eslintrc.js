module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'airbnb-base',
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: [
    '@typescript-eslint',
    'import',
    'vue',
  ],
  // ここにカスタムルールを追加します。
  rules: {
    // 最大字数は警告に留める
    'max-len': 'off',
    // strict モードは警告に留める
    strict: ['warn', 'safe'],

    "@typescript-eslint/no-non-null-assertion": ["off"],

    'import/no-unresolved': 'off',

    // default export を強制すると複数 export するインターフェース変更時に修正箇所が増えるので無効化
    'import/prefer-default-export': 'off',
  },
  settings: {
    'import/resolver': 'webpack'
  },
};
