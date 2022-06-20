import { buildNotification } from '../notification';
describe('/pages/dashboard/components/eventmanager/helpers/notification', () => {
	let eventValues;
	beforeEach(() => {
		eventValues = {
			notifyTo: [
				{
					id: 'ac5e5833-eed9-467e-b11d-d5e23e2aaa23',
					email: 'rebeca.noe@fundacion-jala.org',
				},
				{
					id: '49fbc021-189f-418e-ac7f-2520fde5fc5b',
					email: 'mentor.dev@fundacion-jala.org',
				},
				{
					id: 'd5e7af0f-3c2b-4f0a-a15c-071cbc1e0c32',
					email: 'alejandro@fundacion-jala.org',
				},
			],
			title: 'event title',
			description: 'this is the description of the event',
			type: 'event',
		};
	});
	it('should retun an array of notifications builded', () => {
		const notifications = buildNotification(eventValues);
		expect(notifications).toHaveLength(3);
	});

	it('should retun an specific notification in the array of notifications builded', () => {
		const expectedNotification = {
			userId: 'ac5e5833-eed9-467e-b11d-d5e23e2aaa23',
			title: 'event title',
			description: 'this is the description of the event',
			type: 'event',
			isRead: false,
		};
		const [notification] = buildNotification(eventValues);

		expect(notification).toStrictEqual(expectedNotification);
	});
});
