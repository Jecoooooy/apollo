export default defineNuxtRouteMiddleware((to) => {
	// Log the incoming route details
	console.log('Navigating to:', to.fullPath)

	// If the route doesn't match anything, redirect to the home page
	if (!to.matched.length) {
		console.log('Route not matched, redirecting to home...')
		return navigateTo('/launches')
	}
})
