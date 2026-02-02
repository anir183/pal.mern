import js from "@eslint/js";
import jest from "eslint-plugin-jest";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["./dist/**/*", "**/*.config.ts"],
	},
	{
		plugins: { jest: jest },
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommendedTypeChecked,
	{
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		extends: ["css/recommended"],
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
			},
		},
	},
]);
