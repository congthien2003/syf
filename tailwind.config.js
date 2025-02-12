/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {},
		backgroundImage: {
			"dark-gradient":
				"linear-gradient(90deg, rgba(95,160,178,1) 0%, rgba(50,50,163,1) 35%, rgba(0,212,255,1) 100%)",
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
