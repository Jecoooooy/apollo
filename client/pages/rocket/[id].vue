<template>
	<v-container fluid class="h-100" style="max-height: 80svh; align-content: center">
		<h1 CLASS="text-center">ROCKET</h1>
		<v-card class="mx-auto launch-card" color="transparent" max-width="500">
			<v-card-title>
				<h2>{{ rocketName }}</h2>
			</v-card-title>
			<v-card-text class="rocket-details">
				<v-table hover>
					<tbody>
						<tr>
							<td>
								<p>Description:</p>
							</td>
							<td>
								<p>{{ rocketDescription }}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Rocket First Flight:</p>
							</td>
							<td>
								<p>{{ formatDate(rocketFirstFlight) }}</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Rocket Height:</p>
							</td>
							<td>
								<p>{{ rocketHeight }} ft</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Rocket Diameter</p>
							</td>
							<td>
								<p>{{ rocketDiameter }} Meters</p>
							</td>
						</tr>
						<tr>
							<td>
								<p>Rocket Mass:</p>
							</td>
							<td>
								<p>{{ rocketMass }} Kg</p>
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn variant="elevated" text="Go back" @click="goBack()" />
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<script setup>
import { useDateFormatter } from '~/composables/useDateFormatter'
const { formatDate } = useDateFormatter()
const route = useRoute()

const rocketName = route.query.rocketName || 'No Rocket Name'
const rocketDescription = route.query.rocketDescription || 'No Rocket Description'
const rocketFirstFlight = route.query.rocketFirstFlight || 'No First Flight Date'
const rocketHeight = route.query.rocketHeight || 'No Height Data'
const rocketDiameter = route.query.rocketDiameter || 'No Diameter Data'
const rocketMass = route.query.rocketMass || 'No Mass Data'

const router = useRouter()
function goBack() {
	router.push({
		name: 'launches',
	})
}
</script>
<style>
.rocket-details .v-table {
	background-color: transparent;
}

.rocket-details td {
	padding: 8px !important;
}
</style>
