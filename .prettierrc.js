/** @type {import("prettier").Options} */
export default {
	printWidth: 100,
	useTabs: false,
	trailingComma: "all",
	singleQuote: true,
	tabWidth: 2,
	bracketSpacing: true,
	bracketSameLine: false,
	semi: true,
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	overrides: [
        {
            files: "*.svelte",
            options: { 
                parser: "svelte" 
            },
        },
    ],
};
