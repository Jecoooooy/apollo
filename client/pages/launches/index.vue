<template>
	<v-container>
		<h1>SpaceX Launches</h1>
		<v-row>
			<v-col cols="12" sm="12" md="6" lg="6" xl="6" xxl="6">
				<v-text-field label="search" prepend-inner-icon="mdi-magnify" />
			</v-col>
			<v-col cols="12" sm="12" md="6" lg="6" xl="6" xxl="6" class="d-flex justify-end">
				<v-pagination v-model="currentPage" class="mr-n1" :length="totalPages" :total-visible="5" />
			</v-col>
			<v-col
				v-for="(launch, index) in paginatedItems"
				:key="index"
				cols="6"
				sm="6"
				md="4"
				lg="3"
				xl="3"
				xxl="2"
			>
				<v-card elevation="5">
					<v-card-title tag="h4" class="bg-primary">
						{{ launch.mission_name }}
					</v-card-title>
					<v-card-text>
						<p>Launch Date: {{ formatDate(launch.launch_date_local) }}</p>
						<p>
							Launch Site:{{
								launch.launch_site ? launch.launch_site.site_name : launch.launch_site
							}}
						</p>
						<p>rocket : {{ launch.rocket.rocket_name }}</p>
						<br />
						<p>Details :</p>
						<p style="overflow-y: auto; height: 70px">{{ launch.details }}</p>
					</v-card-text>
					<v-divider />
					<v-card-actions>
						<v-spacer />
						<v-btn color="primary" variant="elevated" text="view" />
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
const query = gql`
	query {
		launches {
			id
			mission_id
			mission_name
			launch_date_local
			launch_site {
				site_id
				site_name
				site_name_long
			}
			rocket {
				rocket_name
				rocket_type
				rocket {
					name
					type
				}
			}
			details
		}
	}
`

const { data } = useAsyncQuery<{
	launches: {
		id: String
		mission_id: String
		mission_name: [String]
		launch_date_local: Date
		launch_site: {
			site_id: String
			site_name: String | null
			site_name_long: String | null
		} | null
		rocket: {
			rocket_name: String
			rocket_type: String
		}
		details: String | null
	}[]
}>(await query)
const launches = computed(() => data.value?.launches ?? [])

function formatDate(date: Date): string {
	const monthNames: string[] = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const currentDate = new Date(date)
	// let hours: number = currentDate.getHours()
	// let minutes: number = currentDate.getMinutes()
	const month: string = monthNames[currentDate.getMonth()]
	let day: number = currentDate.getDate()
	const year: number = currentDate.getFullYear()

	// hours = hours < 10 ? parseInt('0' + hours, 10) : hours
	// minutes = minutes < 10 ? parseInt('0' + minutes, 10) : minutes
	day = day < 10 ? parseInt('0' + day, 10) : day

	// return `${month} ${day}, ${year} - ${hours}:${minutes}`
	return `${month} ${day}, ${year}`
}

const currentPage = ref(1)
const itemsPerPage = 4
const totalPages = computed(() => Math.ceil(launches.value.length / itemsPerPage))

const paginatedItems = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage
	const end = start + itemsPerPage
	return launches.value.slice(start, end)
})
</script>

<style scoped>
/* Add any styles you want here */
</style>
