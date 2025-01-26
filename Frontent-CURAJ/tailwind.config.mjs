/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				
			},
			screens: {
				phone: {'max':'480px'},
				desktop: '720px'//w-3/4
			},
			textColor:{
				
			}
		},
	},
	plugins: [],
}
