<template>
	<v-text-field v-model="formattedDate" :label="label" append-inner-icon="mdi-calendar" readonly>
		<v-menu
			v-model="dateMenu"
			:close-on-content-click="false"
			:open-on-click="readonly"
			location="bottom"
			activator="parent"
			transition="slide-x-transition"
		>
			<v-date-picker
				v-model="selectedDate"
				class="datepicker-position"
				persistent
				header="Select Date"
				color="primary"
				bg-color="surface"
				:landscape="true"
				elevation="8"
			/>
		</v-menu>
	</v-text-field>
</template>

<script lang="ts" setup>
const props = defineProps({
	value: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
	date: {
		type: String,
		default: '',
	},
	readonly: {
		type: Boolean,
		default: true,
	},
})

const emit = defineEmits(['input'])

const selectedDate = ref<Date | null>(props.date ? new Date(props.date) : null)
const dateMenu = ref(false)

const options: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
}

const formattedDate = computed(() =>
	selectedDate.value
		? selectedDate.value.toLocaleDateString('zh-Hans-CN', options).replace(/\//g, '-')
		: '',
)

watch(formattedDate, () => {
	emit('input', formattedDate)
})

watch(
	() => props.date,
	(newDate) => {
		selectedDate.value = newDate ? new Date(newDate) : null
		emit('input', formattedDate.value)
	},
)
</script>
