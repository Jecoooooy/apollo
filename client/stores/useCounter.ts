export const useCounter = defineStore('counter', {
	state: () => ({
		count: 0,
		drawer: false,
	}),
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		increment() {
			this.count++
		},
	},
})
