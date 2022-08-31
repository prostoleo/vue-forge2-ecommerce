<script setup>
	import currencyFormat from '~~/utils/currencyFormat';

	const props = defineProps({
		price: {
			type: Number,
			required: true,
		},
	});
	const pricePretty = computed(() => {
		// return !props.price ? "$0.00" : `$${(props.price / 100).toFixed(2)}`;
		return currencyFormat(props.price);
	});
</script>
<template>
	<span>{{ pricePretty }}</span>
</template>
