/** @type {import("prettier").Options} */
export default {
  printWidth: 100,
  useTabs: false,
  trailingComma: 'none',
  singleQuote: true,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  semi: false,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte'
      }
    }
  ]
}
