import { buildEmail } from '../email';
describe('/pages/dashboard/components/eventmanager/helpers/email', () => {
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
			],
			eventTypeId: '485f2967-539a-40cf-999d-00320590464a',
			title: 'event title',
			description: 'this is the description of the event',
			profile: { id: '485f2967-539a-40cf-999d-00320590464a' },
			events: [{ id: '485f2967-539a-40cf-999d-00320590464a', name: 'Incident' }],
			type: 'EVENT_NOTIFICATION',
		};
	});
	it('Should return the structure of the payload to send email when buildEmail is called', () => {
		const expectedEmail = {
			emailTargets: ['rebeca.noe@fundacion-jala.org', 'mentor.dev@fundacion-jala.org'],
			subject: 'event title',
			body: 'this is the description of the event Event type Incident',
			ownerId: '485f2967-539a-40cf-999d-00320590464a',
			type: 'EVENT_NOTIFICATION',
			hasTemplate: true,
		};
		const email = buildEmail(eventValues);

		expect(email).toEqual(expectedEmail);
	});
});
