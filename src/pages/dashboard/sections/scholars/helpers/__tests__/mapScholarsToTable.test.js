const { default: mapScholarsToTable } = require('../mapScholarsToTable');

const listScholars = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		programVersionName: null,
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2acd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		programVersionName: null,
	},
];

describe('helpers/mapScholarsToTable', () => {
	test('Should return an object with list of headers and rows', () => {
		const data = mapScholarsToTable(listScholars);

		expect(data.headers).toBeInstanceOf(Array);
		expect(data.rows).toBeInstanceOf(Array);
	});
	test('Should return an object with with list of headers of length 7', () => {
		const data = mapScholarsToTable(listScholars);

		expect(data.headers).toHaveLength(8);
	});

	test('Should return an object with with list of rows of length 2', () => {
		const data = mapScholarsToTable(listScholars);

		expect(data.rows).toHaveLength(2);
	});
});
