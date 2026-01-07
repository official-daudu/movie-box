const { defineConfig } = require("eslint-config");

module.exports = defineConfig([
  require("eslint-config-expo/flat"),
  {
    ignores: ["dist/*"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true, // Ensures ESLint uses tsconfig.json paths
          project: "./tsconfig.json", // Path to your tsconfig.json
        },
      },
    },
  },
]);
