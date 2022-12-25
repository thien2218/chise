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
            'blueish': 'var(--clr-blueish)',
            'dimmed-700': 'var(--clr-dimmed-700)',
            'dimmed-600': 'var(--clr-dimmed-600)',
            'dimmed-500': 'var(--clr-dimmed-500)',
            'dimmed-400': 'var(--clr-dimmed-400)',
         },
         screens: {
            "mlg": "960px",
            "xs": "520px",
         }
      },
	},
	plugins: [],
};
