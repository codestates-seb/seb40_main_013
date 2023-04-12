module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "strict-null-checks"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "standard-with-typescript", "prettier", "plugin:prettier/recommended"],
  parserOptions: {
    project: "./tsconfig.strictNullChecks.json",
  },
  ignorePatterns: [".eslintrc.js"],
  env: {
    browser: true,
  },
  rules: {
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "strict-null-checks/all": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};