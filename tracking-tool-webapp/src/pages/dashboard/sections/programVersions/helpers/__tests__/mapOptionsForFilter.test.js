/* eslint-disable react/display-name */
import {
	mapProgramOptions,
	mapCoordinatorOptions,
	mapStatusOption,
	mapPromotedCandidates,
} from '../mapOptionsForFilter';

const listPrograms = ['AT', 'DEV', 'RESEARCH'];
const listStatus = ['Completed', 'InProgress', 'Status', 'Unkown'];
const listCoordinators = [
	{
		id: '3fffc534-1d83-44d5-b264-1e17feabd322',
		firstName: 'Alejandro',
		lastName: 'Ruiz',
		email: 'alejandro.ruiz@fundacion-jala.org',
		currentCity: null,
		phoneNumber: null,
	},
	{
		id: '3fffc534-1d83-44d5-b264-1e17feabd321',
		firstName: 'Test',
		lastName: 'Test',
		email: 'test@fundacion-jala.org',
		currentCity: null,
		phoneNumber: null,
	},
];
const candidates = [
	{
		id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
		person: {
			id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
			fullName: 'Gilda Silvestre López',
			identityCard: '8707891',
			personalEmail: 'gildasilvestrelopez09@gmail.com',
			phoneNumber: '67890456',
			dateBorn: '1998-08-29T00:00:00',
			currentCountry: 'Bolivia',
			currentCity: 'La Paz',
		},
		idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
		programVersionName: 'Dev33',
		profile: {
			id: '375554d2-0906-4207-8e27-bd7e638a7aa4',
			academicDegree: 'System Engineer',
			career: 'Systems Engineering',
			university: 'UMSA',
			pathResume:
				'https://drive.google.com/u/2/open?usp=forms_web&id=1CYIhorrCQQ87cEQkWIXs0m7PCD8_jIQ',
		},
		activity: {
			id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
			activityType: {
				id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
				description: 'Postulation',
			},
			startDateTime: '2022-02-25T10:15:00',
			endDateTime: '2022-02-25T12:00:00',
			isCompleted: false,
			idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
		},
	},
];

describe('helpers/mapOptionsForFilters', () => {
	test('Should return an object with list of coordinators', () => {
		const data = mapCoordinatorOptions(listCoordinators);

		expect(data).toBeInstanceOf(Object);
		expect(data.list).toBeInstanceOf(Array);
	});
	test('Should return an object with list of 3 coordinators', () => {
		const data = mapCoordinatorOptions(listCoordinators);

		expect(data.list).toHaveLength(3);
	});
	test('Should return an object with list of programs', () => {
		const data = mapProgramOptions(listPrograms);

		expect(data).toBeInstanceOf(Object);
		expect(data.list).toBeInstanceOf(Array);
	});
	test('Should return an array with objects', () => {
		const data = mapPromotedCandidates(candidates, 'be26cc70-9d07-10ec-b909-0142ac120002');

		expect(data).toBeInstanceOf(Array);
	});
	test('Should return an object with list of 4 progrmas', () => {
		const data = mapProgramOptions(listPrograms);

		expect(data.list).toHaveLength(4);
	});
	test('Should return an object with list of status', () => {
		const data = mapStatusOption(listStatus);

		expect(data).toBeInstanceOf(Object);
		expect(data.list).toBeInstanceOf(Array);
	});
	test('Should return an object with list of 5 status', () => {
		const data = mapStatusOption(listStatus);

		expect(data.list).toHaveLength(5);
	});
	test('Should return an array of objects with list of 1', () => {
		const data = mapPromotedCandidates(candidates, 'be26cc70-9d07-10ec-b909-0142ac120002');

		expect(data).toHaveLength(1);
	});
});
