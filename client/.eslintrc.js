module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "standard-with-typescript",
      "prettier",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      project: "./tsconfig.json",
    },
    ignorePatterns: [".eslintrc.js"],
    env: {
      browser: true,
    },
    rules: {
      "@typescript-eslint/semi": "off",
      "@typescript-eslint/space-before-function-paren": "off",
    },
};