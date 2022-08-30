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
            icon: 'rgb(var(--clr-icon) / 1)',
            accent: 'rgb(var(--clr-accent) / 1)',
            
            // Hover colors
            'primary-hover': 'rgb(var(--clr-primary-hover) / 1)',
            'dimmed-600': 'rgb(var(--clr-dimmed-600) / 1)',
            'dimmed-500': 'rgb(var(--clr-dimmed-500) / 1)',
            'dimmed-400': 'rgb(var(--clr-dimmed-400) / 1)',
         },

         screens: {
            'laptop': '1024px',
         }
      },
	},
	plugins: [],
};
