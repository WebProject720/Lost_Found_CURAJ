/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {

			},
			screens: {
				phone: { 'max': '620px' },
				tablet: { 'max': '1020px' },//w-3/4
				desktop: "1021px"
			},
			textColor: {

			},
			fontFamily: {
				sans: []
			}
		},
	},
	plugins: [],
}
