import { renderHook } from '@testing-library/react-hooks';
import useSort from '../index';

const mockState = [
	{
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Marcos Armendia',
			personalEmail: 'marcos.armendia@gmail.com',
			currentCity: 'Tarija',
			phoneNumber: 77777888,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 2,
	},
	{
		id: '11221118-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Sofia Perez',
			personalEmail: 'sofia.perez@gmail.com',
			currentCity: 'Santa Cruz',
			phoneNumber: 77777999,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111119-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Michael Jackson Mamani',
			personalEmail: '6665656',
			currentCity: 'Potosi',
			phoneNumber: 77676767,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111120-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Emma Watson Quispe',
			personalEmail: '8787666',
			currentCity: 'Cochabamba',
			phoneNumber: 78786555,
		},
		programVersionName: 'AT31',
		programVersionId: '3fffc534-1d83-34d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111121-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Will Choque Smith',
			personalEmail: '9989897',
			currentCity: 'Oruro',
			phoneNumber: 99886665,
		},
		programVersionName: 'Research31',
		programVersionId: '2ce69f92-1d83-24d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
];

const mockStateSortedByName = [
	{
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Marcos Armendia',
			personalEmail: 'marcos.armendia@gmail.com',
			currentCity: 'Tarija',
			phoneNumber: 77777888,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 2,
	},
	{
		id: '11221118-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Sofia Perez',
			personalEmail: 'sofia.perez@gmail.com',
			currentCity: 'Santa Cruz',
			phoneNumber: 77777999,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111119-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Michael Jackson Mamani',
			personalEmail: '6665656',
			currentCity: 'Potosi',
			phoneNumber: 77676767,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111120-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Emma Watson Quispe',
			personalEmail: '8787666',
			currentCity: 'Cochabamba',
			phoneNumber: 78786555,
		},
		programVersionName: 'AT31',
		programVersionId: '3fffc534-1d83-34d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111121-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Will Choque Smith',
			personalEmail: '9989897',
			currentCity: 'Oruro',
			phoneNumber: 99886665,
		},
		programVersionName: 'Research31',
		programVersionId: '2ce69f92-1d83-24d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
];

const mockStateSortedByNameDescending = [
	{
		id: '11111121-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Will Choque Smith',
			personalEmail: '9989897',
			currentCity: 'Oruro',
			phoneNumber: 99886665,
		},
		programVersionName: 'Research31',
		programVersionId: '2ce69f92-1d83-24d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11221118-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Sofia Perez',
			personalEmail: 'sofia.perez@gmail.com',
			currentCity: 'Santa Cruz',
			phoneNumber: 77777999,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11111119-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Michael Jackson Mamani',
			personalEmail: '6665656',
			currentCity: 'Potosi',
			phoneNumber: 77676767,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
	{
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Marcos Armendia',
			personalEmail: 'marcos.armendia@gmail.com',
			currentCity: 'Tarija',
			phoneNumber: 77777888,
		},
		programVersionName: 'Dev31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 2,
	},
	{
		id: '11111120-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Emma Watson Quispe',
			personalEmail: '8787666',
			currentCity: 'Cochabamba',
			phoneNumber: 78786555,
		},
		programVersionName: 'AT31',
		programVersionId: '3fffc534-1d83-34d5-b264-1e17f2abd322',
		statusTypeId: 1,
	},
];

const mockSortConfigByName = {
	key: 'User',
	direction: 'ASC',
};

const mockSortConfigByNameDescending = {
	key: 'User',
	direction: 'DESC',
};

describe('hooks/useSort', () => {
	test('Should return a boolean if the list of scholars sorted by user name', () => {
		const { result } = renderHook(() => useSort(mockState, mockSortConfigByName));
		expect(mockStateSortedByName).toEqual(result.current.sortedItems);
	});

	test('Should return a boolean if the list of scholars sorted by user name ascending', () => {
		const { result } = renderHook(() => useSort(mockState, mockSortConfigByName));
		expect(mockStateSortedByName).toEqual(result.current.sortedItems);
	});
	test('Should return a boolean if the list of scholars sorted by user name descending', () => {
		const { result } = renderHook(() => useSort(mockState, mockSortConfigByNameDescending));
		!expect(mockStateSortedByNameDescending).not.toEqual(result.current.sortedItems);
	});
});
