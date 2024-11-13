<template>
	<v-app app>
		<div v-if="pagetransition.window" :class="'spaceship ' + (windowZoom ? '' : 'zoom')" />
		<div v-if="pagetransition.window" :class="'mirror ' + (windowZoom ? '' : 'hide')" />

		<transition name="slide-down">
			<c-app-bar
				v-show="pagetransition.appbar"
				style="transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1)"
			/>
		</transition>
		<c-nav-bar v-if="store.windowWidth <= 1280" />
		<v-main v-if="pagetransition.main">
			<slot />
		</v-main>
		<transition name="slide-up" mode="out-in">
			<c-footer v-if="pagetransition.footer" />
		</transition>
	</v-app>
</template>
<script lang="ts" setup>
// const route = useRoute();
const store = useCounter()
// const transitionKey = ref(`${route.path}-${Date.now()}`);
const pagetransition = ref({
	window: true,
	navbar: false,
	appbar: false,
	main: false,
	footer: false,
})
const windowZoom = ref(true)

// watch(
// 	() => route.path,
// 		(newRoute: string) => {
// 			transitionKey.value = `${newRoute}-${Date.now()}`;
// 		}
// );

const loadPage = () => {
	let delay = 200
	for (const key in pagetransition.value) {
		if (Object.prototype.hasOwnProperty.call(pagetransition.value, key) && key !== 'window') {
			setTimeout(() => {
				pagetransition.value[key as keyof typeof pagetransition.value] =
					!pagetransition.value[key as keyof typeof pagetransition.value]
				if (key === 'navbar') {
					// store.drawer = true
				}
			}, delay)
			delay += 200
		} else {
			pagetransition.value[key as keyof typeof pagetransition.value] =
				!pagetransition.value[key as keyof typeof pagetransition.value]
		}
	}
}

setTimeout(() => {
	store.drawer = false
	windowZoom.value = false
	setTimeout(() => {
		loadPage()
	}, 600)
}, 500)

const updateWindowWidth = () => {
	store.setWindowWidth(window.innerWidth)
}
const updateWindowHieght = () => {
	store.setWindowHeight(window.innerHeight)
}
onMounted(() => {
	store.setWindowWidth(window.innerWidth)
	store.setWindowHeight(window.innerHeight)

	window.addEventListener('resize', updateWindowWidth)
	window.addEventListener('resize', updateWindowHieght)
})
onUnmounted(() => {
	window.removeEventListener('resize', updateWindowWidth)
	window.removeEventListener('resize', updateWindowHieght)
})
</script>
<style>
.v-application {
	background-image: linear-gradient(-30deg, rgb(255 255 255 / 0%), rgb(0 0 0)), url('../static/earth.jpg') !important;
	background-position: center, center !important;
	background-size: cover, cover !important;
	background-repeat: no-repeat !important;
	position: relative;
	overflow: hidden;
	transition: all 1s ease !important;

	/* border-radius: 40px!important; */
}

.spaceship {
	position: absolute;
	width: 100%;
	height: 100%;
	background-image: url('../static/spaceship.png');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	overflow: hidden;
	filter: drop-shadow(40px 40px 50px #fafafa4b);
	z-index: 3000;
	transition: all 1s ease-in-out;
	scale: 100%;
}

.zoom {
	scale: 300%;
	filter: drop-shadow(0 0 0 #fafafa4b);
}

.hide {
	opacity: 0;
}

.mirror {
	transition: all 0.5s ease-in-out;
	position: absolute;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		135deg,
		rgb(255 255 255 / 79.5%),
		rgb(255 255 255 / 0%),
		rgb(0 0 0 / 39.7%),
		rgb(255 255 255 / 74.7%),
		rgb(0 0 0 / 0%)
	);
}

.glow-effect {
	box-shadow:
		2px 2px 8px rgb(255 255 255 / 53.4%),
		4px 4px 20px rgb(255 255 255 / 47.9%) !important;
}
</style>
