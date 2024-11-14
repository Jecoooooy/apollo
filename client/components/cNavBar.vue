<template>
	<div>
		<v-navigation-drawer v-model="store.drawer" temporary scrim="true" class="navigation-style">
			<v-list-item title="Appolo Application" subtitle="web" />
			<v-divider />
			<v-list color="primary">
				<v-list-item
					v-for="(link, index) in links"
					:key="index"
					link
					class="text-uppercase text-white"
					:title="link.name && typeof link.name === 'string' ? link.name : 'Home'"
					:to="link.link"
					@click="changeTitle(link.name as string)"
				/>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>
<script lang="ts" setup>
const store = useCounter()

// const router = useRouter()
// const routes = router.options.routes || []

const links = ref([
	{
		name: 'Launches',
		link: '/launches',
	},
	{
		name: 'Favorites',
		link: '/favorites',
	},
])
function changeTitle(item: string) {
	console.log(item)
	if (item === 'index') {
		store.pageTitle = 'Home'
	} else {
		store.pageTitle = item
	}
}
</script>
<style scope>
.navigation-style {
	backdrop-filter: blur(12px);

	/* border-radius: 12px 12px 12px 0; */
}
</style>
