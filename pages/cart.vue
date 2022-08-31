<template>
	<div class="m-10">
		<h1 class="text-3xl mb-5 font-bold">Your Cart</h1>
		<div class="md:flex w-full">
			<div class="md:w-3/4">
				<!-- Use this markup to display an empty cart -->
				<div
					v-if="!cartStore.getCartItemsCount"
					class="italic text-center pt-10"
				>
					Cart is empty
				</div>
				<div v-else class="overflow-x-auto">
					<div class="table w-full">
						<table class="w-full">
							<!-- head -->
							<thead>
								<tr>
									<th>
										<label>
											<input
												type="checkbox"
												class="checkbox"
												ref="checkAll"
												@change="toggleCheckAll"
											/>
										</label>
									</th>
									<th></th>
									<th>Product</th>
									<th>Price</th>
									<th>Number of Items</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="cartItem in cartStore.getCartItems"
									:key="cartItem.sys.id"
								>
									<th>
										<label>
											<input
												v-model="selected"
												type="checkbox"
												class="checkbox"
												@change="checkAll.checked = false"
												:value="cartItem.sys.id"
											/>
										</label>
									</th>
									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="mask mask-squircle w-12 h-12">
													<img
														:src="cartItem.fields.image[0].fields.file.url"
														:alt="cartItem.fields.name"
													/>
												</div>
											</div>
										</div>
									</td>
									<td>
										<div class="font-bold">
											{{ cartItem.fields.name }}
										</div>
										<ProductHeat :heat-level="cartItem.fields.heatLevel" />
									</td>
									<td>
										<ProductPrice :price="cartItem.fields.price" />
									</td>

									<td>
										<input
											class="input input-bordered w-20"
											type="number"
											min="1"
											v-model="cartItem.amount"
										/>
									</td>
									<th>
										<NuxtLink
											:to="{
												name: 'products-id',
												params: { id: cartItem.sys.id },
											}"
										>
											<button class="btn btn-ghost btn-xs">details</button>
										</NuxtLink>
									</th>
								</tr>
							</tbody>
						</table>
						<button
							v-if="selected.length"
							class="text-sm text-red-500"
							@click="handleRemoveSelected"
						>
							Remove Selected
						</button>
					</div>
				</div>
			</div>

			<div class="md:w-1/4 pl-5">
				<div class="card bg-slate-50">
					<div class="card-body">
						<ul>
							<li>
								<strong>Subtotal</strong>:
								{{ currencyFormat(cartStore.getSubTotalCost) }}
							</li>
							<li>
								<strong>Estimated Taxes </strong>:
								{{ currencyFormat(cartStore.getTaxesAmount) }}
							</li>
							<li>
								<strong>Total</strong>:
								{{ currencyFormat(cartStore.getTotalAmount) }}
							</li>
						</ul>
						<div class="card-actions justify-end w-full">
							<button class="btn btn-primary w-full" @click="handleCheckout">
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import currencyFormat from '~~/utils/currencyFormat';

	const selected = ref([]);
	const checkAll = ref();

	const cartStore = useCartStore();

	async function handleCheckout() {
		console.log('checking out');
	}

	function handleRemoveSelected() {
		selected.value.forEach((id) => cartStore.removeFromCart(id));

		selected.value = [];
	}

	function toggleCheckAll() {
		// console.log(checkAll);
		console.log('checkAll: ', checkAll.value);

		if (checkAll.value.checked) {
			const arrOfId = cartStore.getCartItems.map((item) => item.sys.id);
			console.log('arrOfId: ', arrOfId);

			selected.value = arrOfId;
			return;
		}

		selected.value = [];
	}
</script>
