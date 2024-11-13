<template>
	<v-container fluid>
		<v-row class="h-100">
			<v-col
				cols="12"
				lg="4"
				xl="3"
				class="pb-0 d-flex align-end justify-center"
				:style="`min-height: ${store.windowHeight - 150}px`"
			>
				<div class="rounded-lg launch-card glow-effect custom-border pa-2 ma-2">
					<div class="astronaut-container">
						<img src="../../static/astronaut.png" alt="" />
					</div>
					<v-card
						class="mx-auto w-100 rounded-lg mt-2"
						prepend-icon="mdi-account"
						subtitle="CEO"
						max-width="400"
					>
						<v-card-text class="pt-0">
							SpaceX designs, manufactures and launches advanced rockets and spacecraft. The
							company was founded in 2002 to revolutionize space technology, with the ultimate
							goal of enabling people to live on other planets.
						</v-card-text>
					</v-card>
				</div>
			</v-col>
			<v-col cols="12" lg="8" xl="9">
				<v-row no-gutters justify="end" align="center" class="pt-1 text-secondary">
					<v-col cols="12" sm="12" md="7" lg="7" xl="6" xxl="6" class="pa-1">
						<v-text-field
							v-model="search"
							label="search"
							prepend-inner-icon="mdi-magnify"
							clearable
							class="d-inline-block w-75"
							@update:modelValue="onFilter()"
						/>
						<v-select
							v-model="sortOrderBy"
							label="Sort By Date:"
							prepend-inner-icon="mdi-sort"
							:items="['asc', 'desc']"
							class="d-inline-block w-25 pl-2"
							@update:modelValue="onFilter()"
						/>
					</v-col>
					<!-- <v-col cols="6" sm="6" md="6" lg="6" xl="6" xxl="6" class="pa-1 text-secondary"> -->
					<v-spacer />
					<v-pagination
						v-model="currentPage"
						class="pa-1"
						:length="totalPages"
						:total-visible="totalPageVisible"
						@update:modelValue="changePagination()"
					/>
					<!-- </v-col> -->
				</v-row>

				<article class="position-relative h-100" style="min-height: 600px">
					<transition name="slide-down" mode="out-in">
						<div
							v-if="!store.launches.length"
							class="w-100 position-absolute d-flex flex-column justify-center align-center h-100 loader-container"
						>
							<div class="loader" />
							<!-- <p class="text-white"><strong>Loading...</strong></p> -->
						</div>
					</transition>
					<TransitionGroup
						name="slide-card"
						tag="div"
						class="v-row v-row--no-gutters"
						mode="out-in"
					>
						<v-col
							v-for="(launch, index) in paginatedItems"
							v-show="hide[index]"
							:key="index"
							class="pa-2"
							cols="6"
							sm="6"
							md="4"
							lg="4"
							xl="3"
							xxl="2"
						>
							<v-card elevation="10" color="transparent" class="launch-card rounded-lg">
								<v-card-title tag="div" :class="store.windowWidth > 600 ? '' : ' px-2'">
									<div style="max-width: 80%">
										<h5 class="text-truncate">
											{{ launch?.mission_name || 'No Mission Name' }}
										</h5>
									</div>
									<v-btn icon>
										<v-icon>mdi-star-outline</v-icon>
										<v-tooltip activator="parent" location="top">Tooltip</v-tooltip>
									</v-btn>
								</v-card-title>
								<v-card-text :class="store.windowWidth > 600 ? '' : 'pb-1 px-2'">
									<p>Launch Date: {{ formatDate(launch?.launch_date_local) }}</p>
									<p>
										Launch Site:{{ launch?.launch_site?.site_name || 'No Launch Site' }}
									</p>
									<p>rocket : {{ launch?.rocket?.rocket_name || 'No Rocket Name' }}</p>
									<p v-show="store.windowWidth > 600" class="pt-5">Details :</p>
									<p
										v-show="store.windowWidth > 600"
										class="text-caption"
										style="overflow-y: scroll; height: 56px"
									>
										{{ launch?.details || 'No Details Available' }}
									</p>
								</v-card-text>
								<v-divider />
								<v-card-actions>
									<v-spacer />
									<v-btn
										:density="store.windowWidth > 961 ? 'default' : 'comfortable'"
										color="secondary"
										variant="elevated"
										text="view Launch"
									/>
								</v-card-actions>
							</v-card>
						</v-col>
					</TransitionGroup>
				</article>
			</v-col>
		</v-row>
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
	setTimeout(() => {
		filterSort(sortOrderBy.value)
	}, 100)
	currentPage.value = 1
}, 500)

// pagination
const currentPage = ref(1)
const totalPageVisible = ref(4)
const itemsPerPage = computed(() => {
	if (store.windowWidth > 1919) {
		return 8
	} else if (store.windowWidth > 961 && store.windowWidth < 1920) {
		return 6
	} else if (store.windowWidth > 600 && store.windowWidth < 960) {
		return 4
	} else {
		return 6
	}
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value))
const paginatedItems = computed<Launch[]>(() => {
	const start = (currentPage.value - 1) * itemsPerPage.value
	const end = start + itemsPerPage.value
	return filteredItems.value.slice(start, end)
})

// sort
const sortOrderBy = ref('asc')
const { sortByOrder } = useSort()
const filterSort = (order = 'asc') => {
	changePagination()
	filterItems(store.launches, 'mission_name', search.value)
	const sortedFiltered = sortByOrder(filteredItems.value, 'launch_date_local', order)
	return sortedFiltered
}

// launch card transistions
const hide = ref<boolean[]>([])

function changePagination() {
	for (let index = 0; index < itemsPerPage.value; index++) {
		hide.value[index] = false
	}
	let delay = 300
	for (let index = 0; index < itemsPerPage.value; index++) {
		setTimeout(() => {
			hide.value[index] = true
		}, delay)
		delay += 100
	}
}

// responsive height
// const containerHeight = computed(()=>{
// 	if (store.windowWidth < 600) {
// 		store.windowHeight - 200
// 	}else{
// 		store.windowHeight - 300
// 	}
// } )

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
	max-height: 500px !important;
	top: 0;
	left: 0;
}

.astronaut-container {
	width: 100%;
	position: relative;
	height: 200px;
}

.astronaut-container img {
	width: 100%;
	bottom: 0;
	position: absolute;
	filter: drop-shadow(12px 0 20px rgb(255 255 255 / 43.8%));
}

.custom-border {
	border-top-left-radius: 25% !important;
	border-top-right-radius: 25% !important;
}
</style>
