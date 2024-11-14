import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// eslint-disable-next-line import/namespace
import * as labs from 'vuetify/labs/components'
// Use this if you want only icons used by Vuetify components internally should be imported
// import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
// import { VCardTitle } from 'vuetify/lib/components/index.mjs'

const customDarkTheme = {
	dark: true,
	colors: {
		background: '#BDBDBD',
		surface: '#424242',
		primary: '#212121', // darkGray
		secondary: '#CFD8DC',
	},
}
const customLightTheme = {
	dark: false,
	colors: {
		background: '#ECEFF1',
		surface: '#eff2f3',
		primary: '#CFD8DC',
		secondary: '#212121',
		error: '#B71C1C',
		warning: '#FFD180',
		success: '#66BB6A',
		info: '#81D4FA',
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
			VCard: {
				class: ['glow-effect'],
				VCardTitle: {
					class: [
						'text-primary',
						'bg-secondary',
						'd-flex',
						'justify-space-between',
						'align-center',
					],
					VBtn: {
						density: 'compact',
						variant: 'text',
					},
				},
				VCardText: {
					class: ['text-secondary', 'pt-2'],
				},
			},
			VDialog: {
				VCard: {
					VCardTitle: {
						class: [
							'pa-4',
							'text-primary',
							'bg-secondary',
							'd-flex',
							'align-center',
							'justify-space-between',
						],
						VBtn: {
							density: 'compact',
							rounded: true,
							color: 'error',
							variant: 'tonal',
						},
					},
					VCardText: {
						class: ['pt-2 pa-4'],
					},
					VCardActions: {
						class: ['pa-4'],
						VBtn: {
							variant: 'elevated',
						},
					},
				},
			},
			VPagination: {
				color: 'secondary',
				activeColor: 'primary',
				density: 'comfortable',
				variant: 'elevated',
			},
			VTooltip: {
				activator: 'parent',
				location: 'top',
			},
			VTextField: {
				variant: 'outlined',
				density: 'compact',
				hideDetails: true,
			},
			VSelect: {
				variant: 'outlined',
				density: 'compact',
				hideDetails: true,
			},
			VExpansionPanels: {
				class: ['glow-effect'],
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
