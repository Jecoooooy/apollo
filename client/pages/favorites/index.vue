<template>
	<v-container>
		<div class="rounded mt-10 custom-table ma-auto w-100" style="max-width: 1000px">
			<div class="w-100 d-flex">
				<v-btn text="clear record" @click="openDialog = true" />
				<v-spacer />
				<v-pagination
					v-model="currentPage"
					class="pa-1"
					:length="totalPages"
					:total-visible="totalPageVisible"
				/>
			</div>
			<v-table fixed-header hover color="transparent">
				<thead>
					<tr>
						<th>Mission Name</th>
						<th>Rocket Name</th>
						<th>Detail</th>
						<th width="100px">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in paginatedItems" :key="index">
						<td>{{ item.mission_name }}</td>
						<td>{{ item.rocket.rocket_name }}</td>
						<td>{{ item.rocket.rocket_type }}</td>
						<td>
							<v-btn icon="mdi-delete" density="compact" rounded color="error" />
						</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<v-dialog v-model="openDialog" max-width="400">
			<v-card>
				<v-card-title>
					<h4 class="text-ceenter w-100 d-block">You are about to delete all records</h4>
				</v-card-title>
				<v-card-text>
					<p class="text-body-1">Are you sure you cant to delete All Records?</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text="cancel" variant="tonal" color="info" @click="openDialog = false" />
					<v-btn class="ml-2" text="clear" color="error" @click="clearFavorites" />
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>
<script lang="ts" setup>
import Swal from 'sweetalert2'
const store = useCounter()
const currentPage = ref(1)
const totalPageVisible = ref(0)
const itemsPerPage = ref(8)

const totalPages = computed(() => Math.ceil(store.favorites.length / itemsPerPage.value))
const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return store.favorites.slice(start, end)
})

const openDialog = ref(false)
function clearFavorites() {
	store.favorites = []

	// for (let index = 0; index < store.favorites.length; index++) {
	//     store.favorites.pop()
	// }
	const toast = Swal.mixin({
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		toast: true,
		text: 'Nice!',
	})
	toast.fire({
		icon: 'success',
		title: 'All Records Deleted',
		background: '#4CAF50',
	})
	openDialog.value = false
}
</script>
<style>
.custom-table th {
	border: 1px solid #fafafa77;
	background-color: #424242;
}

.custom-table td {
	border: 1px solid #4242424f;
}

.custom-table .v-table {
	background-color: transparent;
	backdrop-filter: blur(12px);
	backdrop-filter: blur(12px);
	background-image: linear-gradient(45deg, #fafafa65, #2121213f);
	transition: all 0.2s ease;
}

.custom-table td:nth-child(4) {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
