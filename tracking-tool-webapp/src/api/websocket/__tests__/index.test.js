import { getWebSocketValues } from '../index';

const userId = '0db49517-9dc3-4912-ab69-405597af1f9e';
jest.mock('helpers/tokenDecoder', () => ({
	decodeToken: () => ({ sub: `${userId}` }),
}));

describe('api/websockets', () => {
	it('should retun topic with userId', () => {
		const expectedTopic = `/user/${userId}/queue/notification`;
		const { topic } = getWebSocketValues();
		expect(topic).toBe(expectedTopic);
	});
});
