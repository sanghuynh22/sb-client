export const formatNumber = (n) => {
	let num = parseInt(n);
	if (num.toString().length > 3) {
		num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	}
	return num;
};
