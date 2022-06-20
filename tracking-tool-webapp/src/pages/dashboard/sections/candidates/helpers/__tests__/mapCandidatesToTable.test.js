const { default: mapCandidatesToTable } = require('../mapCandidatesToTable');

const listCandidates = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		program: null,
		profile: {
			pathresume: 'www.google.com',
		},
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		program: null,
		profile: {
			pathresume: 'www.google.com',
		},
	},
];

describe('helpers/mapCandidatesToTable', () => {
	test('Should return an object with list of headers', () => {
		const data = mapCandidatesToTable(listCandidates);

		expect(data.headers).toBeInstanceOf(Array);
	});
	test('Should return an object with a list of headers of length 8', () => {
		const data = mapCandidatesToTable(listCandidates);

		expect(data.headers).toHaveLength(8);
	});
});
