<template>
	<v-app-bar app class="appbar-style">
		<v-app-bar-nav-icon rounded @click="store.drawer = !store.drawer" />
		<v-app-bar-title>SpaceX / {{ store.pageTitle }}</v-app-bar-title>
	</v-app-bar>
</template>
<script lang="ts" setup>
const store = useCounter()
const route = useRoute()

function dispalyTitle() {
	console.log(route.name)

	if (route.name === 'index') {
		store.pageTitle = 'Home'
	} else {
		store.pageTitle = route.name ? String(route.name) : 'Unknown'
		console.log(store.pageTitle)
	}
}

// onMounted(() => {
dispalyTitle()

// })
</script>
<style scope>
.appbar-style {
	border-radius: 0 0 12px 12px !important;
}
</style>
