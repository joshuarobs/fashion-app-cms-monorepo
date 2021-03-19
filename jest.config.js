// eslint-disable-next-line no-undef
module.exports = {
  verbose: true,
  // collectCoverage: true,
  coverageReporters: ["lcov", "json"],
  // collectCoverageFrom: ["**/src/**"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  setupFilesAfterEnv: ["./setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
    "node_modules/(?!@joshuarobs)/",
  ],
  testPathIgnorePatterns: ["/build/", "/node_modules/"],
};

// // eslint-disable-next-line no-undef
// module.exports = {
//   /**
//    * You can use jsWithBabel preset provided by ts-jest so you don't need to define transform here. The preset jsWithBabel
//    * will automatically define "^.+\\.jsx?$": "babel-jest" for you
//    */
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//     "^.+\\.jsx?$": "babel-jest",
//     // "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
//     // "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
//   },
//   roots: ["<rootDir>/packages"],
//   collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
//   setupFiles: ["react-app-polyfill/jsdom"],
//   // setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   testMatch: [
//     "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
//     "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
//   ],
//   // testEnvironment: "jest-environment-jsdom-fourteen",
//   transformIgnorePatterns: [
//     "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
//     "^.+\\.module\\.(css|sass|scss)$",
//     "node_modules/(?!@joshuarobs)/",
//     // 'node_modules/(?!(a-module' + '|@joshuarobs/clothing-enums' + ')/)',
//     // '/node_modules/(?!@joshuarobs/clothing-enums).+\\.js$',
//   ],
//   modulePaths: [],
//   moduleNameMapper: {
//     "^react-native$": "react-native-web",
//     "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
//   },
//   moduleFileExtensions: [
//     "web.js",
//     "js",
//     "web.ts",
//     "ts",
//     "web.tsx",
//     "tsx",
//     "json",
//     "web.jsx",
//     "jsx",
//     "node",
//   ],
//   watchPlugins: [
//     "jest-watch-typeahead/filename",
//     "jest-watch-typeahead/testname",
//   ],
// };
