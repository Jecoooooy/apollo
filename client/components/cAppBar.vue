<template>
	<v-app-bar>
		<v-app-bar-nav-icon @click="store.drawer = !store.drawer" />
		<v-app-bar-title>Nuxt - ES2020 - Vuetify - GraphQL - Pinia - Vue3</v-app-bar-title>
	</v-app-bar>
</template>
<script lang="ts" setup>
const store = useCounter()
</script>
