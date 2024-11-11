export const useFilter = () => {
	const filteredItems = ref([])

	const filterItems = (items, query) => {
		if (!query) {
			filteredItems.value = items
		} else {
			filteredItems.value = items.filter((item) =>
				item.name.toLowerCase().includes(query.toLowerCase()),
			)
		}
	}

	return {
		filteredItems,
		filterItems,
	}
}
