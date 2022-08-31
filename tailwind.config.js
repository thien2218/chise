/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
         colors: {
            // Colors
            primary: 'rgb(var(--clr-primary) / 1)',
            secondary: 'rgb(var(--clr-secondary) / 1)',
            accent: 'rgb(var(--clr-accent) / 1)',
            'dark-gray': 'rgb(var(--clr-dark-gray) / 1)',
            'primary-hover': 'rgb(var(--clr-primary-hover) / 1)',
            'dimmed-600': 'rgb(var(--clr-dimmed-600) / 1)',
            'dimmed-500': 'rgb(var(--clr-dimmed-500) / 1)',
            'dimmed-400': 'rgb(var(--clr-dimmed-400) / 1)',
            'black-overlay': 'rgb(0 0 0 / .5)'
         },

         screens: {
            'laptop': '1024px',
         }
      },
	},
	plugins: [],
};
