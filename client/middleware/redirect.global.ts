export default defineNuxtRouteMiddleware((to) => {
	console.log('Navigating to:', to.fullPath)

	if (!to.matched.length) {
		console.log('Route not matched, redirecting to home...')
		return navigateTo('/launches')
	}
})
