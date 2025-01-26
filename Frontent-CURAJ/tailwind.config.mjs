/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				bg_color: 'red',
				//Template 1
				green_c: "#49c5b6",
				white_c: "#ffffff",
				gray_c: "#9C9C9C",
				//2
				blue_c: "#5c5ad6",
				blue_dark_c:"#5c5ad6",
				white_c: "#ffffff",
				aqua_c: "#bdeffe",
				//
				alert:'#ff731e',
				success:"#39ff39",
			},
			screens: {
				phone: '0px',//min-width:480px
				desktop: '720px'//w-3/4
			},
			textColor:{
				blue_c: "#5c5ad6",
				white_c: "#ffffff",
				aqua_c: "#bdeffe"
			}
		},
	},
	plugins: [],
}
