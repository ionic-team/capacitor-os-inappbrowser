const ionic = require("@ionic/eslint-config/recommended");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "example-app/**",
      "example-app-spm/**",
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
    ],
  },
  ...ionic,
];
