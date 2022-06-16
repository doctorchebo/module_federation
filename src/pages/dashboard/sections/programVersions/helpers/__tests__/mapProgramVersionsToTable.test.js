const { default: mapProgramVersionsToTable } = require('../mappers/programVersionsToTable');

const listProgramVersions = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		name: 'Dev31',
		startDate: '2021-01-15T00:00:00.0000000Z',
		endDate: '2021-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
		},
		status: 'InProgress',
	},
	{
		id: '2ce69f92-1d83-24d5-b264-1e17f2abd322',
		name: 'Research31',
		startDate: '2021-01-15T00:00:00.0000000Z',
		endDate: '2021-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
		},
		status: 'InProgress',
	},
];

describe('helpers/mapProgramVersionsToTable', () => {
	test('Should return an object with list of headers and rows', () => {
		const data = mapProgramVersionsToTable(listProgramVersions);

		expect(data.headers).toBeInstanceOf(Array);
		expect(data.rows).toBeInstanceOf(Array);
	});
	test('Should return an object with with list of headers of length 5', () => {
		const data = mapProgramVersionsToTable(listProgramVersions);

		expect(data.headers).toHaveLength(5);
	});

	test('Should return an object with with list of rows of length 2', () => {
		const data = mapProgramVersionsToTable(listProgramVersions);

		expect(data.rows).toHaveLength(2);
	});
});
