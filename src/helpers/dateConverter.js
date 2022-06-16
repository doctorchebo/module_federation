import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

/**
 * @param {string} date - date in MM/DD/YYYY format
 * @returns {string} - date format with month and year.
 */
export function ConvertToMonthYear(date) {
	let momentDate = dayjs(date).format('MMM DD, YYYY');
	return momentDate;
}

/**
 * @param {string} startDate - date in MM/DD/YYYY format
 * @param {string} endDate - date in MM/DD/YYYY format
 * @returns {string} - time difference with years and months.
 */
export function GetMonthYearDiff(startDate, endDate) {
	const monthsDiff = dayjs(endDate).diff(dayjs(startDate), 'months', true);
	const years = monthsDiff.toFixed(2) / 12;
	const months = ((monthsDiff.toFixed(2) % 12) * 12) / 10;
	const result = `${years.toFixed()} years, ${months.toFixed()} months`;
	return result;
}

/**
 * Format the date by difference between the current date and the obtained date
 *
 * @param {Date} date - value instance of Date
 * @returns {string} - date normalized in February 7th
 */
export function formatDateByDiffTime(date) {
	const now = dayjs();
	const dateConverted = dayjs(date);
	if (now.diff(dateConverted, 'seconds') < 60) {
		return `${now.diff(dateConverted, 'seconds')} seconds ago`;
	} else if (now.diff(dateConverted, 'minutes') < 60) {
		return `${now.diff(dateConverted, 'minutes')} minutes ago`;
	} else if (now.diff(dateConverted, 'hours') < 24) {
		return `${now.diff(dateConverted, 'hours')} hours ago`;
	} else if (now.diff(dateConverted, 'days') < 7) {
		return dayjs(date).format('dddd, h:mm a');
	} else {
		return dayjs(date).format('dddd, MMMM DD YYYY, h:mm a');
	}
}
