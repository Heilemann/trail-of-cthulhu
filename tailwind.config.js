/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	// darkMode: '[data-mode="dark"]',
	theme: {
		extend: {
			colors: {
				gray: colors.zinc,
			},
		},
	},
	plugins: [],
}
