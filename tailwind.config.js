/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	purge: {
		content: [
			'./src/**/*.{js,jsx,ts,tsx}',
			'./node_modules/nrsystemtools/dist/vite/*.{js,jsx,ts,tsx}',
		],
		safelist: ['dark'],
	},
	darkMode: ['media', '[data-mode="dark"]'],
	theme: {
		extend: {
			colors: {
				gray: colors.zinc,
			},
		},
	},
	plugins: [],
}
