import { mapProgramVersionOptions, mapStatusTypeOptions } from '../mapOptionsForFilter';

const programVersionsList = [
	{
		id: '4fffc534-1d83-12d5-b264-1e17f2abd322',
		name: 'Dev29',
		startDate: '2019-01-15T00:00:00.0000000Z',
		endDate: '2019-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Completed',
	},
	{
		id: '4fffc534-1d83-13d5-b264-1e17f2abd322',
		name: 'Dev30',
		startDate: '2020-01-15T00:00:00.0000000Z',
		endDate: '2020-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Completed',
	},
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
			ci: null,
			roles: [],
		},
		status: 'Completed',
	},
	{
		id: '4fffc534-1d83-15d5-b264-1e17f2abd322',
		name: 'Dev32',
		startDate: '2022-01-15T00:00:00.0000000Z',
		endDate: '2022-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Pending',
	},
	{
		id: '4fffc534-1d83-16d5-b264-1e17f2abd322',
		name: 'Dev33',
		startDate: '2023-01-15T00:00:00.0000000Z',
		endDate: '2023-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Pending',
	},
	{
		id: '2ce69f92-1d83-22d5-b264-1e17f2abd322',
		name: 'Research29',
		startDate: '2019-01-15T00:00:00.0000000Z',
		endDate: '2019-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Completed',
	},
	{
		id: '2ce69f92-1d83-23d5-b264-1e17f2abd322',
		name: 'Research30',
		startDate: '2020-01-15T00:00:00.0000000Z',
		endDate: '2020-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Completed',
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
			ci: null,
			roles: [],
		},
		status: 'Completed',
	},
	{
		id: '2ce69f92-1d83-25d5-b264-1e17f2abd322',
		name: 'Research32',
		startDate: '2022-01-15T00:00:00.0000000Z',
		endDate: '2022-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Pending',
	},
	{
		id: '2ce69f92-1d83-26d5-b264-1e17f2abd322',
		name: 'Research33',
		startDate: '2023-01-15T00:00:00.0000000Z',
		endDate: '2023-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
			ci: null,
			roles: [],
		},
		status: 'Pending',
	},
];
const StatusTypeList = [
	{
		id: 1,
		name: 'Active',
	},
	{
		id: 2,
		name: 'Completed',
	},
	{
		id: 3,
		name: 'Inactive',
	},
	{
		id: 4,
		name: 'OnHold',
	},
];

describe('helpers/mapOptionsForFilters', () => {
	test('Should return an object with list of programs versions', () => {
		const data = mapProgramVersionOptions(programVersionsList);

		expect(data).toBeInstanceOf(Object);
		expect(data.list).toBeInstanceOf(Array);
	});
	test('Should return an object with list of 11 programs versions', () => {
		const data = mapProgramVersionOptions(programVersionsList);

		expect(data.list).toHaveLength(11);
	});
	test('Should return an object with list of status type', () => {
		const data = mapStatusTypeOptions(StatusTypeList);

		expect(data).toBeInstanceOf(Object);
		expect(data.list).toBeInstanceOf(Array);
	});
	test('Should return an object with list of 5 status type', () => {
		const data = mapStatusTypeOptions(StatusTypeList);

		expect(data.list).toHaveLength(5);
	});
});
