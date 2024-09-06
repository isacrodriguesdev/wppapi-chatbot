module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "prettier/prettier": ["error", { semi: true }],
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-namespace": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../*", "./*"],
      },
    ],
    "@typescript-eslint/no-implicit-any-catch": "off",
    "@typescript-eslint/no-explicit-any-catch": "off",
    "@typescript-eslint/no-implicit-any": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
