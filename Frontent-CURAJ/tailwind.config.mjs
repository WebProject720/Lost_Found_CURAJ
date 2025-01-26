/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				
			},
			screens: {
				phone: {'max':'480px'},
				tablet: {max:'1080px',min:'481px'},//w-3/4
				desktop:"1081px"
			},
			textColor:{
				
			},
			fontFamily:{
				sans:[]
			}
		},
	},
	plugins: [],
}
