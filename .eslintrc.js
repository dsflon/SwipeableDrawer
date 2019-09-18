module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // より厳しいルールにするには`plugin:vue/strongly-recommended` もしくは `plugin:vue/recommended` に切り替えることを検討してください。
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  // *.vue ファイルを lint にかけるために必要
  plugins: ["vue"],
  // ここにカスタムルールを追加します。
  rules: {
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
      }
    }],
    "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
        }
    ],

    // const or let を強制
    "no-var": "error",
    // 再代入がない限り const を強制
    "prefer-const": "error",

    "no-irregular-whitespace": 0,

    "no-control-regex": 0,
    "no-useless-escape": 0
  }
};
