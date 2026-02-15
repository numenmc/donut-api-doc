import js from "@eslint/js";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,

  {
    ignores: ["dist/", "build/", "node_modules/"]
  },

  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: [".svelte"]
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      "svelte/no-at-html-tags": ["off"]
    }
  }
];
