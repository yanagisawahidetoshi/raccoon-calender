export const getPathYearMonth = (pathName, format) => {
	const matchDate = pathName.match(/^\/(\d{4})\/(0?[1-9]|1[0-2])\/?$/);
	if (matchDate) {
		return format(
			new Date(`${matchDate[1]} / ${matchDate[2]}`),
			"yyyy/MM"
		);
	}
	return new Date();
}
