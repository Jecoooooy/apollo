export const useSort = () => {
	// Sorts by ascending or descending order
	const sortByOrder = (array, dateKey, order = 'asc') => {
		return array.sort((a, b) => {
			const dateA = new Date(a[dateKey])
			const dateB = new Date(b[dateKey])

			if (order === 'asc') {
				return dateA - dateB
			} else {
				return dateB - dateA
			}
		})
	}

	const sortByDateRange = (array, dateKey, dateFrom, dateTo) => {
		const fromDate = new Date(dateFrom)
		const toDate = new Date(dateTo)

		return array
			.filter((item) => {
				const itemDate = new Date(item[dateKey])
				return itemDate >= fromDate && itemDate <= toDate
			})
			.sort((a, b) => {
				const dateA = new Date(a[dateKey])
				const dateB = new Date(b[dateKey])
				return dateA - dateB
			})
	}

	return { sortByOrder, sortByDateRange }
}
