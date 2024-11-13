<template>
	<v-footer color="transparent" app class="px-4 py-2 footer-style text-body-2 text-center">
		<h6 class="text-center w-100" style="filter: invert(1)">
			This project is powered by: Nuxt, ES2020, Vuetify, GraphQL, Pinia and Vue3 - ©
			{{ new Date().getFullYear() }}
		</h6>
	</v-footer>
</template>
<script lang="ts" setup></script>
<style>
.footer-style {
	backdrop-filter: blur(12px);
	background-image: linear-gradient(-90deg, rgb(0 0 0 / 64.4%), #cfd8dc73) !important;
}
</style>
