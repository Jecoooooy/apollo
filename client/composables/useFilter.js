export const useFilter = () => {
	const filteredItems = ref([])

	const filterItems = (items, itemToFilter, search) => {
		if (!search) {
			filteredItems.value = items
		} else {
			filteredItems.value = items.filter((item) =>
				item[itemToFilter].toLowerCase().includes(search.toLowerCase()),
			)
		}
	}

	return {
		filteredItems,
		filterItems,
	}
}
