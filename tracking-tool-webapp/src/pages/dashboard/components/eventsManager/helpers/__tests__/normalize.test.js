import {
	authorsToOptions,
	eventTypesToOptions,
	notificationUsersToOptions,
	stagesToOptions,
	statusTypesToOptions,
} from '../normalize';

const userId = '9b39b96c-7b35-4260-af4a-e52c8e80671b';
jest.mock('helpers/tokenDecoder', () => ({
	decodeToken: () => ({ sub: `${userId}` }),
}));

describe('pages/dashboard/components/helpers/normalize', () => {
	it('Should return event types to options', () => {
		const eventTypes = [
			{ id: 'bb3d977f-ff7b-4344-a350-3ecd1ba98857', name: 'event1' },
			{ id: 'f2b1e440-9f8b-4f7f-90ba-cff8ec506daa', name: 'event2' },
		];
		const [option1, option2] = eventTypesToOptions(eventTypes);
		expect(option1.text).toStrictEqual('event1');
		expect(option2.text).toStrictEqual('event2');
	});
	it('Should return stages to options', () => {
		const stages = [
			{
				id: 'guid-stage-1',
				name: 'stage1',
				subjects: [{ id: 'guid-subject1', name: 'subject1' }],
			},
			{
				id: 'guid-stage-2',
				name: 'stage2',
				subjects: [{ id: 'guid-subject2', name: 'subject2' }],
			},
		];
		const [stage1, stage2] = stagesToOptions(stages);
		expect(stage1.text).toStrictEqual('stage1');
		expect(stage1.subjects).toHaveLength(1);

		expect(stage2.text).toStrictEqual('stage2');
		expect(stage2.subjects).toHaveLength(1);
	});
	test('Should status types to options', () => {
		const statusTypes = [
			{
				id: 'guid-statusType-1',
				name: 'statusType1',
			},
			{
				id: 'guid-statusType-2',
				name: 'statusType2',
			},
		];
		const [statusType1, statusType2] = statusTypesToOptions(statusTypes);
		expect(statusType1.text).toStrictEqual('statusType1');
		expect(statusType2.text).toStrictEqual('statusType2');
	});

	test('Should return users to options', () => {
		const users = [
			{
				id: 'a2a327c1-8ea7-427a-9f6c-57450616daa6',
				firstName: 'Andres',
				lastName: 'Perez',
				email: 'andres.perez@fundacion-jala.org',
				ci: 3456739,
				issued: 'CBBA',
				phoneNumber: 768910934,
				currentCity: 'Cochabamba',
			},
			{
				id: '9b39b96c-7b35-4260-af4a-e52c8e80671b',
				firstName: 'Juan',
				lastName: 'Perez',
				email: 'juan.perez@fundacion-jala.org',
				ci: 3456789,
				issued: 'CBBA',
				phoneNumber: 76890934,
				currentCity: 'Cochabamba',
			},
		];
		const usersOptions = notificationUsersToOptions(users);
		expect(usersOptions).toHaveLength(1);
		expect(usersOptions[0].value).toStrictEqual('a2a327c1-8ea7-427a-9f6c-57450616daa6');
	});

	test('Should return authors to options', () => {
		const authors = [
			{
				id: 'a2a327c1-8ea7-427a-9f6c-57450616daa6',
				firstName: 'Andres',
				lastName: 'Perez',
				email: 'andres.perez@fundacion-jala.org',
				ci: 3456739,
				issued: 'CBBA',
				phoneNumber: 768910934,
				currentCity: 'Cochabamba',
			},
			{
				id: '9b39b96c-7b35-4260-af4a-e52c8e80671b',
				firstName: 'Juan',
				lastName: 'Perez',
				email: 'juan.perez@fundacion-jala.org',
				ci: 3456789,
				issued: 'CBBA',
				phoneNumber: 76890934,
				currentCity: 'Cochabamba',
			},
		];
		const authorsOptions = authorsToOptions(authors);
		expect(authorsOptions).toHaveLength(3);
		expect(authorsOptions[0].value).toStrictEqual('a2a327c1-8ea7-427a-9f6c-57450616daa6');
	});
	test('Should return empty authors to options when authors is null', () => {
		const authors = null;
		const authorsOptions = authorsToOptions(authors);
		expect(authorsOptions).toHaveLength(0);
	});
});
