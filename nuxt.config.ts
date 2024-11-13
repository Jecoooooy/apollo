import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	srcDir: 'client/',
	build: { transpile: ['vuetify'] },
	imports: { dirs: ['./stores'] },
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: { httpEndpoint: 'https://spacex-production.up.railway.app/' },
		},
	},
	vite: {
		plugins: [vuetify()],
	},
	modules: [
		'@nuxtjs/apollo',
		[
			'@pinia/nuxt',
			{
				autoImports: ['defineStore', 'acceptHMRUpdate'],
				plugins: process.client ? ['pinia-plugin-persistedstate'] : [],
			},
		],
	],
	css: [
		'vuetify/styles',
		'@mdi/font/css/materialdesignicons.css',
		'assets/transition.css',
		'assets/loaders.css',
		'assets/responsive.css',
		'assets/swal.css',
	],
	app: {
		head: {
			title: 'SpaceX',
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/client/static/SpaceXLogo.png' }],
		},
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
})
