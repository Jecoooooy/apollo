<template>
	<v-container class="position-relative h-100">
		<v-row class="text-secondary pt-4">
			<v-col cols="12" sm="6" md="6" lg="4" xl="3" xxl="3" class="py-1">
				<v-text-field
					v-model="search"
					label="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					@update:modelValue="onFilter"
				/>
			</v-col>
			<v-col cols="12" sm="6" md="6" lg="4" xl="3" xxl="3" class="py-1">
				<v-select
					v-model="sortOrderBy"
					label="Sort By Date:"
					prepend-inner-icon="mdi-sort"
					:items="['asc', 'desc']"
					@update:modelValue="filterSort(sortOrderBy, dateFrom, dateTo)"
				/>
			</v-col>
			<v-col cols="12" sm="6" md="6" lg="4" xl="3" xxl="3" class="py-1">
				<c-date-picker
					label="Date From:"
					@date="dateFrom"
					@input="updateDateFrom"
					@update:modelValue="filterSort(sortOrderBy, dateFrom, dateTo)"
				/>
				<p class="text-white">{{ dateFrom }}</p>
			</v-col>
			<v-col cols="12" sm="6" md="6" lg="4" xl="3" xxl="3" class="py-1">
				<c-date-picker
					label="Date To:"
					@date="dateTo"
					@input="updateDateTo"
					@update:modelValue="filterSort(sortOrderBy, dateFrom, dateTo)"
				/>
			</v-col>
			<v-col cols="12" sm="12" md="12" lg="4" xl="6" xxl="6" class="d-flex justify-end py-1">
				<v-pagination
					v-model="currentPage"
					class="mr-n1"
					:length="totalPages"
					:total-visible="4"
					@update:modelValue="changePagination()"
				/>
			</v-col>
		</v-row>
		<article class="position-relative h-100">
			<TransitionGroup name="slide-card" tag="div" class="v-row" mode="out-in">
				<v-col
					v-for="(launch, index) in paginatedItems"
					v-show="hide[index]"
					:key="index"
					cols="6"
					sm="6"
					md="4"
					lg="3"
					xl="3"
					xxl="2"
				>
					<v-card elevation="10" color="transparent" class="launch-card rounded-lg">
						<v-card-title tag="h4" class="text-secondary bg-white">
							{{ launch?.mission_name || 'No Mission Name' }}
						</v-card-title>
						<v-card-text class="text-secondary pt-2">
							<p>Launch Date: {{ formatDate(launch?.launch_date_local) }}</p>
							<p>Launch Site:{{ launch?.launch_site?.site_name || 'No Launch Site' }}</p>
							<p>rocket : {{ launch?.rocket?.rocket_name || 'No Rocket Name' }}</p>
							<br />
							<p class="text-body-2">Details :</p>
							<p class="text-caption" style="overflow-y: scroll; height: 56px">
								{{ launch?.details || 'No Details Available' }}
							</p>
						</v-card-text>
						<v-divider />
						<v-card-actions>
							<v-btn icon color="secondary" density="compact">
								<v-icon>mdi-star-outline</v-icon>
								<v-tooltip activator="parent" location="top">Tooltip</v-tooltip>
							</v-btn>
							<v-spacer />
							<v-btn color="secondary" variant="elevated" text="view Launch" />
						</v-card-actions>
					</v-card>
				</v-col>
			</TransitionGroup>
			<transition name="slide-down" mode="out-in">
				<div
					v-if="!store.launches.length"
					class="w-100 position-absolute d-flex flex-column justify-center align-center h-100 loader-container"
				>
					<div class="loader" />
					<p class="text-white"><strong>Loading...</strong></p>
				</div>
			</transition>
		</article>
	</v-container>
</template>

<script lang="ts" setup>
import { useFilter } from '~/composables/useFilter'
import { useDebounce } from '~/composables/useDebounce'
import { useDateFormatter } from '~/composables/useDateFormatter'
import { useSort } from '~/composables/useSort'
import type { Launch } from '@/graphql/launchesQuery'

const store = useCounter()
const { formatDate } = useDateFormatter()

// filter
const { filteredItems, filterItems } = useFilter()
const search = ref(null)
filteredItems.value = filteredItems.value || []
const onFilter = () => {
	debouncedOnFilter()
}

// debounce
const debouncedOnFilter = useDebounce(() => {
	changePagination()
	filterItems(store.launches, 'mission_name', search.value)
	currentPage.value = 1
}, 500)

// pagination
const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))
const paginatedItems = computed<Launch[]>(() => {
	const start = (currentPage.value - 1) * itemsPerPage
	const end = start + itemsPerPage
	return filteredItems.value.slice(start, end)
})

// sort
const sortOrderBy = ref('asc')
const { sortByOrder, sortByDateRange } = useSort()
const filterSort = (order = 'asc', dateFrom = '', dateTo = '') => {
	changePagination()
	filterItems(store.launches, 'mission_name', search.value)

	const sortedFiltered = sortByOrder(filteredItems.value, 'launch_date_local', order)

	if (dateFrom && dateTo) {
		return sortByDateRange(sortedFiltered, 'launch_date_local', dateFrom, dateTo)
	}
	console.log('data filtered and sorted')

	return sortedFiltered
}

// datePicker
const dateFrom = ref<string>('')
const updateDateFrom = (newDate: string) => {
	dateFrom.value = newDate
}
const dateTo = ref<string>('')
const updateDateTo = (newDate: string) => {
	dateFrom.value = newDate
}

// launch card transistions
const hide = ref<boolean[]>([])

function changePagination() {
	for (let index = 0; index < itemsPerPage; index++) {
		hide.value[index] = false
	}
	let delay = 300
	for (let index = 0; index < itemsPerPage; index++) {
		setTimeout(() => {
			hide.value[index] = true
		}, delay)
		delay += 100
	}
}

onMounted(async () => {
	await store.getLaunchesData()
	if (store.launches && store.launches.length) {
		changePagination()
		filterItems(store.launches, 'mission_name', search.value)
		console.log('Now launches available')
	} else {
		console.warn('No launches available')
	}
})

watch(
	() => store.loading,
	() => {
		if (store.launches) {
			changePagination()
		}
	},
)
// for launches update
watch(
	() => store.launches,
	(newLaunches) => {
		if (newLaunches.length) {
			filterItems(store.launches, 'mission_name', search.value)
		}
	},
	{ immediate: true },
)
</script>

<style scoped>
.launch-card {
	backdrop-filter: blur(12px);
	background-image: linear-gradient(45deg, #fafafa65, #2121213f);
	transition: all 0.2s ease;
}

.loader-container {
	z-index: 1;
	max-height: 500px;
	top: 0;
	left: 0;
}
</style>
