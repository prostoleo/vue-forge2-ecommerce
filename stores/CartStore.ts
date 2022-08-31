import { defineStore, acceptHMRUpdate } from 'pinia';
export const useCartStore = defineStore('CartStore', {
	state: () => {
		// const route = useRoute();
		return {
			/**
			 * The listing of all the products in cart
			 */
			items: [],
			tax: 10,
		};
	},
	getters: {
		getCartItems(state) {
			return state.items;
		},

		getCartItemsCount(state) {
			return state.items.reduce((acc, item) => {
				console.log('item: ', item);
				return acc + item.amount;
			}, 0);
		},

		getSubTotalCost: (state) => {
			return state.items.reduce((acc, item) => {
				console.log('item: ', item);
				return acc + item.fields.price * item.amount;
			}, 0);
		},

		getTaxesAmount(state) {
			return (this.getSubTotalCost * (state.tax / 100)).toFixed(2);
		},

		getTotalAmount() {
			return this.getSubTotalCost + +this.getTaxesAmount;
		},
	},
	actions: {
		addToCart(cartItem) {
			const itemAlreadyExists = this.items.find(
				(item) => item.sys.id === cartItem.sys.id
			);
			console.log('itemAlreadyExists: ', itemAlreadyExists);

			if (itemAlreadyExists) {
				this.items = this.items.map((item) => {
					console.log('item: ', item);

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

			this.items.unshift(newCartItem);
		},

		removeFromCart(id) {
			this.items = this.items.filter((item) => item.sys.id !== id);
		},

		incrementAmount(id) {
			this.items = this.items.map((item) => {
				if (item.sys.id === id) {
					return {
						...item,
						amount: item.amount++,
					};
				}
			});
		},
		decreaseAmount(id) {
			this.items = this.items.map((item) => {
				if (item.sys.id === id && item.amount > 1) {
					return {
						...item,
						amount: item.amount--,
					};
				}
			});
		},
	},
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
