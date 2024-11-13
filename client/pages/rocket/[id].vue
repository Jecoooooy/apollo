<template>
	<v-container fluid class="h-100" style="max-height: 80svh; align-content: center">
		<h1 CLASS="text-center">ROCKET</h1>
		<v-card class="mx-auto launch-card" color="transparent" max-width="500">
			<v-card-title>
				<h2>{{ rocketName }}</h2>
			</v-card-title>
			<v-card-text class="rocket-details">
				<p>Description:</p>
				<p>{{ rocketDescription }}</p>
				<p>Rocket First Flight:</p>
				<p>{{ formatDate(rocketFirstFlight) }}</p>
				<p>Rocket Height:</p>
				<p>{{ rocketHeight }}</p>
				<p>Rocket Diameter</p>
				<p>{{ rocketDiameter }}</p>
				<p>Rocket Mass:</p>
				<p>{{ rocketMass }}</p>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn variant="elevated" text="Go back" />
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
</script>
