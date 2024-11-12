<template>
	<v-app-bar app class="appbar-style" scroll-behavior="fully-hide" style="transition: all 0.5s ease">
		<v-app-bar-nav-icon v-if="store.windowWidth <= 1280" rounded @click="store.drawer = !store.drawer" />
		<div class="image-container pl-4 ma-auto">
			<img src="../static/SpaceXLogo.png" aspect-ratio="16/9" />
		</div>
		<v-app-bar-title :class="' '">/ {{ store.pageTitle }}</v-app-bar-title>
	</v-app-bar>
</template>
<script lang="ts" setup>
const store = useCounter()
const route = useRoute()

function dispalyTitle() {
	// console.log(route.name)

	if (route.name === 'index') {
		store.pageTitle = 'Home'
	} else {
		store.pageTitle = route.name ? String(route.name) : 'Unknown'
		// console.log(store.pageTitle)
	}
}

// onMounted(() => {
dispalyTitle()

// })
</script>
<style scope>
.appbar-style {
	/* border-radius: 0 0 12px 12px !important; */

	/* background-color: transparent!important; */
}

.image-container {
	max-width: 200px;
	background-color: transparent;
	filter: invert(1);

	/* mix-blend-mode: difference; */
}

.image-container img {
	width: 100%;

	/* aspect-ratio: 16/9; */

	/* object-fit: cover; */
}
</style>
