import js from "@eslint/js";
import globals from "globals";
import jest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node, 
        ...globals.jest, 
      },
    },
    plugins: {
      jest, 
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jest.configs.recommended.rules, 
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
]);
