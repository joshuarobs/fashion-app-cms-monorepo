// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-types": "off",
  },
};

// module.exports = {
//   root: true,
//   parser: "@typescript-eslint/parser",
//   plugins: ["@typescript-eslint"],
//   extends: [
//     // "react-app",
//     // "react-app/jest",
//     "airbnb-typescript",
//     "plugin:react/recommended",
//     // 'plugin:@typescript-eslint/recommended',
//     // "prettier/@typescript-eslint",
//     // "plugin:prettier/recommended",
//     "prettier",
//   ],
//   rules: {
//     "no-unused-vars": "warn",
//     "import/extensions": [
//       "error",
//       "ignorePackages",
//       {
//         js: "never",
//         jsx: "never",
//         ts: "never",
//         tsx: "never",
//       },
//     ],
//     "@typescript-eslint/camelcase": "off",
//     "import/prefer-default-export": "off",
//     "@typescript-eslint/no-explicit-any": ["off"],
//     "@typescript-eslint/explicit-function-return-type": ["off"],
//     "react/jsx-filename-extension": [
//       1,
//       {
//         extensions: [".tsx"],
//       },
//     ],
//   },
//   settings: {
//     react: {
//       version: "detect",
//     },
//     "import/resolver": {
//       node: {
//         extensions: [".js", ".ts", ".tsx"],
//       },
//     },
//   },
// };
