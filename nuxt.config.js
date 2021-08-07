export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	ssr: true,
	head: {
		title: "pokedex",
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		"@/assets/styles/index.scss"
	],

	styleResources: {
        scss: ["@/assets/styles/global/variables/index.scss"]
    },

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		"@nuxtjs/style-resources"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		"@nuxtjs/axios"
	],
	axios: {
		proxy: true
	},
	proxy: {
		"/api/pokemon": {
			target: process.env.API_POKEHABITAD_SERVICE,
			pathRewrite: { "^/api/pokemon": "/" }
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
			]
		}
	}
};
