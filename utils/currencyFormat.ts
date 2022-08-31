export default function currencyFormat(number: number) {
	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	}).format(number);
}
