export function useDebounce(callback, delay) {
	const timeoutId = ref(null)

	const debounce = (args) => {
		if (timeoutId.value) {
			clearTimeout(timeoutId.value)
		}

		timeoutId.value = setTimeout(() => {
			callback(args)
		}, delay)
	}

	return debounce
}
