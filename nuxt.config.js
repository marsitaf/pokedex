export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	ssr: true,
	globals: {
		id: "poke-app"
	},
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

	css: [
		"@/assets/styles/index.scss"
	],

	styleResources: {
        scss: [ 
			"@/assets/styles/global/variables/index.scss",
			'@/assets/styles/layout/mixins/index.scss'
		]
    },

	plugins: [],

	components: true,

	buildModules: [
		"@nuxtjs/style-resources",
		'@nuxtjs/google-fonts'
	],
	googleFonts: {
		families: {
			Lato: [300, 400, 500]
		}
	},

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

	build: {
		babel: {
			plugins: [
				["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
			]
		}
	}
};
