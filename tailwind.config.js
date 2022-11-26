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
            primary: 'var(--clr-primary)',
            secondary: 'var(--clr-secondary)',
            'dark-gray': 'var(--clr-dark-gray)',
            'primary-hover': 'var(--clr-primary-hover)',
            'dimmed-600': 'var(--clr-dimmed-600)',
            'dimmed-500': 'var(--clr-dimmed-500)',
            'dimmed-400': 'var(--clr-dimmed-400)',
         },
      },
	},
	plugins: [],
};
