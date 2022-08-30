<script setup>
	import { refDebounced } from '@vueuse/shared';

	const { $contentful } = useNuxtApp();

	const productStore = useProductStore();
	const filters = computed(() => productStore.filters);
	/* const debounceInput = refDebounced(toRef(filters.value.query), 500, {
		maxWait: 1000,
	}); */

	watch(
		filters,
		// [filters, debounceInput],
		async () => {
			useRouter().push({ query: filters.value });

			await productStore.fetchProducts();
			// console.log('filters.value.order: ', filters.value.order);
			// console.log('debounceInput: ', debounceInput);

			/* const isPriceToOrder = filters.value.order.includes('price');

			const contentfulProductsFiltered = await $contentful.getEntries({
				content_type: 'product',
				'fields.heatLevel': filters.value['fields.heatLevel'],
				'fields.name': {
					match: filters.value.query.toLowerCase(),
					// match: debounceInput.value.toLowerCase(),
				},
				order: isPriceToOrder && filters.value.order,
			}); */

			/* const filteredProducts = isPriceToOrder ? contentfulProductsFiltered.items : contentfulProductsFiltered.items.sort((a, b) => {
				if (!filters.value.order.includes('-')) {
					
				} else {

				}
			}) */

			// console.log('filteredProducts: ', filteredProducts);

			// productStore.$state.products = filteredProducts.items;
		},
		{
			immediate: true,
			deep: true,
		}
	);
</script>
<template>
	<div class="filters-wrapper flex gap-2 items-center">
		<div class="form-control">
			<label class="label" for="search">
				<span class="label-text">Search</span>
			</label>
			<input
				id="search"
				v-model="filters.query"
				type="text"
				class="input input-bordered"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="filterHeat">
				<span class="label-text">Filter By Heat</span>
			</label>
			<select
				id="filterHeat"
				class="select select-bordered"
				v-model="filters[`fields.heatLevel`]"
			>
				<option value="">All</option>
				<option value="Mild">Mild</option>
				<option value="Medium">Medium</option>
				<option value="Hot">Hot</option>
			</select>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="orderBy">
				<span class="label-text">Order by</span>
			</label>
			<select
				class="select select-bordered"
				v-model="filters.order"
				id="orderBy"
			>
				<option value="">None</option>
				<option value="-fields.heatLevel">Heat (Mild First)</option>
				<option value="fields.heatLevel">Heat (Hot First)</option>
				<option value="fields.price">Price (Low to High)</option>
				<option value="-fields.price">Price (High to Low)</option>
			</select>
		</div>
	</div>
</template>

<style scoped>
	@media (max-width: 560px) {
		.filters-wrapper {
			display: block;
			width: 100%;
		}
		.form-control {
			width: 100% !important;
			max-width: 100%;
		}
		input,
		select {
			width: 100%;
		}
	}
</style>
