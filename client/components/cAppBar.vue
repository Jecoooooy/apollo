<template>
	<div>
		<v-app-bar app class="appbar-style" color="transparent" scroll-behavior="fully-hide">
			<v-app-bar-nav-icon
				v-if="store.windowWidth <= 1280"
				rounded
				style="filter: invert(1)"
				@click="store.drawer = !store.drawer"
			/>
			<div class="image-container pl-4 ma-auto">
				<img src="../static/SpaceXLogo.png" aspect-ratio="16/9" />
			</div>
			<v-app-bar-title style="filter: invert(1)">/ {{ store.pageTitle }}</v-app-bar-title>
			<template v-if="store.windowWidth >= 1280" #append>
				<v-list-item
					v-for="(link, index) in routes"
					:key="index"
					link
					class="text-uppercase text-white rounded"
					style="filter: invert(1)"
					:title="link.name && typeof link.name === 'string' ? link.name : 'Home'"
					:to="link.path"
					@click="changeTitle(link.name as string)"
				/>
			</template>
		</v-app-bar>
	</div>
</template>
<script lang="ts" setup>
const store = useCounter()
const route = useRoute()

function dispalyTitle() {
	if (route.name === 'index') {
		store.pageTitle = 'Home'
	} else {
		store.pageTitle = route.name ? String(route.name) : 'Unknown'
	}
}

const router = useRouter()
const routes = router.options.routes || []

function changeTitle(item: string) {
	if (item === 'index') {
		store.pageTitle = 'Home'
	} else {
		store.pageTitle = item
	}
}

// onMounted(() => {
dispalyTitle()

// })
</script>
<style scope>
.appbar-style {
	/* border-radius: 0 0 12px 12px !important; */
	background-image: linear-gradient(-45deg, rgb(255 255 255 / 49.3%), rgb(0 0 0 / 24.7%)) !important;
	backdrop-filter: blur(12px);

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
