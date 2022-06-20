import sort from 'helpers/sort';

describe('helpers/sort', () => {
	describe('Sort list of objects by some attribute', () => {
		const unsortedList = [
			{
				name: 'Sum',
				count: 0,
			},
			{
				name: 'MyTag',
				count: 7,
			},
			{
				name: 'Today',
				count: 1,
			},
			{
				name: 'Important',
				count: 2,
			},
		];

		it('Should sort an unsorted list by name', () => {
			const sortedListByName = [
				{
					name: 'Important',
					count: 2,
				},
				{
					name: 'MyTag',
					count: 7,
				},
				{
					name: 'Sum',
					count: 0,
				},
				{
					name: 'Today',
					count: 1,
				},
			];
			const result = sort('name', unsortedList);
			expect(result).toStrictEqual(sortedListByName);
		});

		it('Should sort an unsorted list by count', () => {
			const sortedListByCount = [
				{
					name: 'Sum',
					count: 0,
				},
				{
					name: 'Today',
					count: 1,
				},
				{
					name: 'Important',
					count: 2,
				},
				{
					name: 'MyTag',
					count: 7,
				},
			];
			const result = sort('count', unsortedList);
			expect(result).toStrictEqual(sortedListByCount);
		});
	});
});
