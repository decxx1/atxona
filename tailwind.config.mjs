/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		extend: {
			screens: {
				xs: '400px',
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			colors: {
				"primary":"#617669",
				"secondary": "#e1e2bf",
				"terceary": "#2a6439",
				"textLogo": "#636569"
			},
			fontFamily: {
                montserrat: ['Montserrat Variable', 'sans-serif'],
            },
		},
	},
	plugins: [],
}
