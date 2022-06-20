const isWeekday = (date) => {
	const day = date.getDay();
	return day !== 0 && day !== 6;
};

export default isWeekday;
