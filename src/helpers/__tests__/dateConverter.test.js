import { ConvertToMonthYear, formatDateByDiffTime, GetMonthYearDiff } from '../dateConverter';

describe('helpers/dateConverter', () => {
	describe('formatDateByDiffTime', () => {
		test('should return correct format with seconds of difference', () => {
			const now = new Date();
			const mockDate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours(),
				now.getMinutes(),
				now.getSeconds() - 10
			);
			expect(formatDateByDiffTime(mockDate)).toBe('10 seconds ago');
		});

		test('should return correct format with minutes of difference', () => {
			const now = new Date();
			const mockDate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours(),
				now.getMinutes() - 10,
				now.getSeconds()
			);
			expect(formatDateByDiffTime(mockDate)).toBe('10 minutes ago');
		});

		test('should return correct format with hours of difference', () => {
			const now = new Date();
			const mockDate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours() - 10,
				now.getMinutes(),
				now.getSeconds()
			);
			expect(formatDateByDiffTime(mockDate)).toBe('10 hours ago');
		});

		test('should return correct format with more of the 6 days of difference', () => {
			const mockDate = new Date(2021, 4, 14, 18, 19);
			expect(formatDateByDiffTime(mockDate)).toBe('Friday, May 14 2021, 6:19 pm');
		});

		test('should return the parsed date correctly', () => {
			const mockDate = new Date(2022, 9, 14);
			expect(ConvertToMonthYear(mockDate)).toBe('Oct 14, 2022');
		});

		test('should return the difference between enroll date and end date correctly', () => {
			const enrollDate = new Date(2021, 9, 14);
			const endDate = new Date(2024, 12, 14);
			expect(GetMonthYearDiff(enrollDate, endDate)).toBe('3 years, 4 months');
		});
	});
});
