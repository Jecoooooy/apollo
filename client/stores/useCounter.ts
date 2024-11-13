import { GET_LAUNCHES_QUERY } from '@/graphql/launchesQuery'
import type { Launch } from '@/graphql/launchesQuery'
export const useCounter = defineStore('counter', {
	state: () => ({
		count: 0,
		drawer: false,
		pageTitle: 'Home',
		launches: [] as Launch[],
		favorites: [] as Launch[],
		loading: false,
		panel: true,
		windowWidth: process.client ? window.innerWidth : 0,
		windowHeight: process.client ? window.innerHeight : 0,
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		increment() {
			this.count++
		},
		setWindowWidth(width: number) {
			this.windowWidth = width
			// console.log(this.windowWidth)
		},
		setWindowHeight(height: number) {
			this.windowHeight = height
			// console.log(this.windowHeight)
		},
		getLaunchesData() {
			this.loading = true

			const { result, error, loading: gqlLoading } = useQuery(GET_LAUNCHES_QUERY)

			watch(gqlLoading, (newLoading) => {
				if (!newLoading && result.value) {
					this.launches = result.value.launches
					this.loading = gqlLoading.value
				}
			})

			if (error.value) {
				console.error('Error fetching launches:', error.value)
			}
		},
	},
})
