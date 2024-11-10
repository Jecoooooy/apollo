import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as labs from 'vuetify/labs/components'
// Use this if you want only icons used by Vuetify components internally should be imported
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const customDarkTheme = {
	dark: true,
	colors: {
		background: '#BDBDBD',
		surface: '#CFD8DC',
		primary: '#212121', // darkGray
		secondary: '#FFFDE7',
		// error: "#ff5722",
		// text:"#ffffff",
		// third:"#3E2723",
		// info:"#01579B"
	},
}
const customLightTheme = {
	dark: false,
	colors: {
		background: '#ECEFF1',
		surface: '#eff2f3',
		primary: '#FFFDE7',
		secondary: '#212121', // darkGray
		// error: "#EF5350",
		// warning:"#FFD180",
		// success:"#66BB6A",
		// info:"#81D4FA",
		// text:"#424242",
		// third:"#8D6E63"
	},
}

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		components: { ...labs },
		theme: {
			defaultTheme: 'customDarkTheme',
			// "customLightTheme"
			themes: {
				customDarkTheme,
				customLightTheme,
			},
		},
		defaults: {
			global: {},
			VAppBar: {
				color: 'primary',
			},
			VCard: {},
			VSheet: {},
			VPagination: {
				color: 'primary',
				activeColor: 'secondary',
				density: 'comfortable',
				variant: 'elevated',
			},
			VTable: {},
			VTooltip: {
				activator: 'parent',
				location: 'top',
			},
			VIcon: {},
			VTextField: {
				variant: 'outlined',
				density: 'compact',
				hideDetails: true,
			},
		},
		// Refer to https://vuetifyjs.com/en/features/icon-fonts/
		// icons: {
		// 	defaultSet: 'mdi',
		// 	aliases,
		// 	sets: {
		// 		mdi
		// 	}
		// },
		ssr: true,
	})

	nuxtApp.vueApp.use(vuetify)
})
