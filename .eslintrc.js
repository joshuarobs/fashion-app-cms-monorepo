module.exports = {
  extends: [
    // "react-app",
    "airbnb",
    "plugin:react/recommended",
    // 'plugin:@typescript-eslint/recommended',
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier",
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/camelcase": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["error"],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx"],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".tsx"],
      },
    },
  },
};
