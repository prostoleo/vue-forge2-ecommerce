import { defineStore, acceptHMRUpdate } from 'pinia';
// import {ref} from 'vue';

export const useCartStoreComp = defineStore('CartStoreComp', () => {
	const items = ref([]);
	const tax = ref(10);

	const getCartItems = computed(() => items.value);
	const getCartItemsCount = computed(() => {
		return items.value.reduce((acc, item) => {
			console.log('item: ', item);
			return acc + item.amount;
		}, 0);
	});

	const getSubTotalCost = computed(() => {
		return items.value.reduce((acc, item) => {
			// console.log('item: ', item);
			return acc + item.fields.price * item.amount;
		}, 0);
	});

	const getTaxesAmount = computed(() => {
		return (getSubTotalCost.value * (tax.value / 100)).toFixed(2);
	});

	const getTotalAmount = computed(() => {
		return getSubTotalCost.value + +getTaxesAmount.value;
	});

	function addToCart(cartItem) {
		const itemAlreadyExists = items.value.find(
			(item) => item.sys.id === cartItem.sys.id
		);
		// console.log('itemAlreadyExists: ', itemAlreadyExists);

		if (itemAlreadyExists) {
			items.value = items.value.map((item) => {
				// console.log('item: ', item);

				if (item.sys.id === itemAlreadyExists.sys.id) {
					return {
						...item,
						amount: item.amount + 1,
					};
				}

				return item;
			});

			return;
		}

		const newCartItem = {
			...cartItem,
			amount: 1,
		};

		items.value.unshift(newCartItem);
	}

	function removeFromCart(id) {
		items.value = items.value.filter((item) => item.sys.id !== id);
	}

	function incrementAmount(id) {
		items.value = items.value.map((item) => {
			if (item.sys.id === id) {
				return {
					...item,
					amount: item.amount++,
				};
			}
		});
	}
	function decreaseAmount(id) {
		items.value = items.value.map((item) => {
			if (item.sys.id === id && item.amount > 1) {
				return {
					...item,
					amount: item.amount--,
				};
			}
		});
	}

	return {
		getCartItems,
		getCartItemsCount,
		getSubTotalCost,
		getTaxesAmount,
		getTotalAmount,

		addToCart,
		removeFromCart,
		incrementAmount,
		decreaseAmount,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
