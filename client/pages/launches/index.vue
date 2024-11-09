<template>
	<section>
		<h1>SpaceX Launches</h1>
		<v-container>
			<v-row>
				<v-col v-for="(launch, index) in launches" :key="index" cols="3">
					<v-card elevation="5">
						<v-card-title tag="h4" class="bg-primary">
							{{ launch.mission_name }}
						</v-card-title>
						<v-card-text>
							<p>Launch Date: {{ formatDate(launch.launch_date_local) }}</p>
							<p v-if="launch.launch_site">Launch Site:{{ launch.launch_site.site_name }}</p>
							<p>rocket : {{ launch.rocket.rocket_name }}</p>
							<br />
							<p style="overflow-y: auto; height: 70px">Details : {{ launch.details }}</p>
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
	</section>
</template>

<script lang="ts" setup>
const query = gql`
	query {
		launches(limit: 1) {
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
	let hours: number = currentDate.getHours()
	let minutes: number = currentDate.getMinutes()
	const month: string = monthNames[currentDate.getMonth()]
	let day: number = currentDate.getDate()
	const year: number = currentDate.getFullYear()

	hours = hours < 10 ? parseInt('0' + hours, 10) : hours
	minutes = minutes < 10 ? parseInt('0' + minutes, 10) : minutes
	day = day < 10 ? parseInt('0' + day, 10) : day

	return `${month} ${day}, ${year} - ${hours}:${minutes}`
}
</script>

<style scoped>
/* Add any styles you want here */
</style>
