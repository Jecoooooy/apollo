<template>
	<v-navigation-drawer v-model="store.drawer">
		<v-list-item title="My Application" subtitle="Vuetify" />
		<v-divider />
		<v-list-item
			v-for="(link, index) in routes"
			:key="index"
			link
			class="text-uppercase"
			:title="link.name == 'index' ? 'Home' : link.name"
			:to="link.path"
		/>
	</v-navigation-drawer>
</template>
<script lang="ts" setup>
const store = useCounter()
const router = useRouter()
const routes = router.options.routes
console.log(routes)
</script>
