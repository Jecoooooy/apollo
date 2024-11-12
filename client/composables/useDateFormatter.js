export const useDateFormatter = () => {
	const formatDate = (date) => {
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const currentDate = new Date(date)
		// let hours = currentDate.getHours()
		// let minutes = currentDate.getMinutes()
		const month = monthNames[currentDate.getMonth()]
		let day = currentDate.getDate()
		const year = currentDate.getFullYear()
		// hours = hours < 10 ? parseInt('0' + hours, 10) : hours
		// minutes = minutes < 10 ? parseInt('0' + minutes, 10) : minutes
		day = day < 10 ? '0' + day : day

		return `${month} ${day}, ${year}`
	}

	return { formatDate }
}
