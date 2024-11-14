<template>
	<v-container fluid>
		<v-row class="h-100">
			<v-col
				cols="12"
				lg="4"
				xl="3"
				:class="` ${store.windowWidth <= 1280 ? 'align-end' : 'align-center'} d-flex justify-center`"
				:style="`min-height: ${store.windowHeight - 150}px`"
			>
				<transition name="slide-left" mode="out-in">
					<div
						v-show="pagetransition.astronautBackground"
						class="rounded-lg launch-card glow-effect custom-border pa-6 ma-2 w-100 mb-n6"
						style="transition: all 0.3s ease; min-height: 340px; max-width: 400px"
					>
						<transition name="slide-right" mode="out-in">
							<div
								v-show="pagetransition.astronaut"
								class="astronaut-container position-relative"
								style="z-index: 30"
							>
								<img src="../../static/astronaut.png" alt="" />
							</div>
						</transition>
						<transition name="slide-down" mode="out-in">
							<v-card
								v-show="pagetransition.astronautLabel"
								class="mx-auto w-100 rounded-lg mt-2 mb-n12"
								max-width="400"
							>
								<v-card-text class="pt-0">
									SpaceX designs, manufactures and launches advanced rockets and spacecraft.
									The company was founded in 2002 to revolutionize space technology, with
									the ultimate goal of enabling people to live on other planets.
								</v-card-text>
							</v-card>
						</transition>
					</div>
				</transition>
			</v-col>
			<v-col cols="12" lg="8" xl="9" class="pt-16 expand-height-animation">
				<v-row no-gutters justify="end" align="center" class="pt-1 text-secondary">
					<v-col
						cols="12"
						sm="12"
						md="7"
						lg="7"
						xl="6"
						xxl="6"
						class="pa-1"
						style="min-height: 56px"
					>
						<transition name="slide-down" mode="out-in">
							<v-text-field
								v-if="pagetransition.search"
								v-model="search"
								label="search"
								prepend-inner-icon="mdi-magnify"
								clearable
								class="d-inline-block w-75"
								@update:model-value="onFilter()"
							/>
						</transition>
						<transition name="slide-down" mode="out-in">
							<v-select
								v-if="pagetransition.sort"
								v-model="sortOrderBy"
								label="Sort By Date:"
								prepend-inner-icon="mdi-sort"
								:items="['asc', 'desc']"
								class="d-inline-block w-25 pl-2"
								@update:model-value="onFilter()"
							/>
						</transition>
					</v-col>
					<v-spacer />
					<transition name="slide-down" mode="out-in" tag="div" style="min-height: 56px">
						<v-pagination
							v-if="pagetransition.pagination"
							v-model="currentPage"
							class="pa-1"
							:length="totalPages"
							:total-visible="totalPageVisible"
							@update:model-value="changePagination()"
						/>
					</transition>
				</v-row>

				<transition name="slide-up" mode="out-in">
					<article
						v-if="pagetransition.data"
						class="position-relative h-100"
						style="min-height: 600px"
					>
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
										<v-btn icon @click="openAddFavoritesDialog(launch)">
											<v-icon v-if="changeFavIcon(launch?.id)">mdi-star-outline</v-icon>
											<v-icon v-else>mdi-star</v-icon>
											<v-tooltip activator="parent" location="top">
												Add to Favorites
											</v-tooltip>
										</v-btn>
									</v-card-title>
									<v-card-text :class="store.windowWidth > 600 ? '' : 'pb-1 px-2'">
										<p>Launch Date: {{ formatDate(launch?.launch_date_local) }}</p>
										<p>
											Launch Site:{{
												launch?.launch_site?.site_name || 'No Launch Site'
											}}
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
											color="#2E7D32"
											variant="flat"
											text="view Rocket"
											@click="goToRocketPage(launch)"
										/>
									</v-card-actions>
								</v-card>
							</v-col>
						</TransitionGroup>
					</article>
				</transition>
			</v-col>
		</v-row>
		<v-dialog v-model="addFavoritesDialog" max-width="400px">
			<v-card>
				<v-card-title>
					<p class="text-h6">Add to Favorites</p>
					<v-btn icon="mdi-close" @click="addFavoritesDialog = false" />
				</v-card-title>
				<v-card-text>
					<p class="text-body-1">
						Mission Name: {{ favoriteItem?.mission_name || 'No Mission Name' }}
					</p>
					<p>Rocket Name: {{ favoriteItem?.rocket.rocket_name || 'No Rocket Name' }}</p>
					<br />
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<v-btn text="add" color="success" @click="addToFavorites()" />
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2'
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

// add Favorites
const addFavoritesDialog = ref(false)
const favoriteItem = ref<Launch | null>(null)
function openAddFavoritesDialog(item: Launch) {
	addFavoritesDialog.value = true
	favoriteItem.value = item
}
function addToFavorites() {
	let exist = false
	for (let index = 0; index < store.favorites.length; index++) {
		const element = store.favorites[index]
		if (element.id === favoriteItem.value?.id) {
			exist = true
		}
	}

	if (favoriteItem.value && !exist) {
		store.favorites.push(favoriteItem.value)
		const toast = Swal.mixin({
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			toast: true,
			text: favoriteItem.value.rocket.rocket_name + ' is added',
		})
		toast.fire({
			icon: 'success',
			title: 'Nice!',
			background: '#4CAF50',
		})
	} else {
		const toast = Swal.mixin({
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			toast: true,
			text: 'Rocket already added',
		})
		toast.fire({
			icon: 'error',
			title: 'Opps!',
			background: '#B71C1C',
		})
	}
	addFavoritesDialog.value = false
}

function changeFavIcon(item: string) {
	for (let index = 0; index < store.favorites.length; index++) {
		const element = store.favorites[index]
		if (element.id === item) {
			return false
		}
	}
	return true
}
const router = useRouter()
const goToRocketPage = (launch: Launch) => {
	const rocketData = launch.rocket?.rocket || null
	// console.log(
	// 	router.resolve({
	// 		params: { id: launch.id }, // Dynamic route uses the [id] parameter
	// 		query: {
	// 			rocketName: rocketData?.name || 'No Rocket Name',
	// 			rocketDescription: rocketData?.description || 'No Rocket Description',
	// 			rocketFirstFlight: rocketData?.first_flight || 'No First Flight Date',
	// 			rocketHeight: rocketData?.height?.feet || 'No Height Data',
	// 			rocketDiameter: rocketData?.diameter?.meters || 'No Diameter Data',
	// 			rocketMass: rocketData?.mass?.kg || 'No Mass Data',
	// 		},
	// 	})
	// );
	// loadPage()

	let delay = 1400
	for (const key in pagetransition.value) {
		if (Object.prototype.hasOwnProperty.call(pagetransition.value, key)) {
			setTimeout(() => {
				pagetransition.value[key as keyof typeof pagetransition.value] =
					!pagetransition.value[key as keyof typeof pagetransition.value]
			}, delay)
			delay -= 200
		}
	}
	setTimeout(() => {
		router.push({
			// params: { id: launch.id },
			path: `/rocket/${launch.id}`,
			query: {
				rocketName: rocketData?.name || 'No Rocket Name',
				rocketDescription: rocketData?.description || 'No Rocket Description',
				rocketFirstFlight: rocketData?.first_flight || 'No First Flight Date',
				rocketHeight: rocketData?.height?.feet || 'No Height Data',
				rocketDiameter: rocketData?.diameter?.meters || 'No Diameter Data',
				rocketMass: rocketData?.mass?.kg || 'No Mass Data',
			},
		})
	}, 2000)
}

// page transition
const pagetransition = ref({
	astronautBackground: false,
	astronaut: false,
	astronautLabel: false,
	search: false,
	sort: false,
	pagination: false,
	data: false,
})

const loadPage = () => {
	let delay = 200
	for (const key in pagetransition.value) {
		if (Object.prototype.hasOwnProperty.call(pagetransition.value, key)) {
			setTimeout(() => {
				pagetransition.value[key as keyof typeof pagetransition.value] =
					!pagetransition.value[key as keyof typeof pagetransition.value]
			}, delay)
			delay += 200
		}
	}
	setTimeout(() => {
		if (store.launches && store.launches.length) {
			changePagination()
			filterItems(store.launches, 'mission_name', search.value)
		}
	}, delay)
}

onMounted(async () => {
	loadPage()
	await store.getLaunchesData()
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

<style>
.launch-card {
	backdrop-filter: blur(12px);
	background-image: linear-gradient(-45deg, #092e7e3f, #bebebe7e) !important;
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

.expand-height-animation {
	animation: expand-height 1s ease-in-out forwards;
}

@keyframes expand-height {
	from {
		min-height: 0;
	}

	to {
		min-height: 800px;
	}
}
</style>
