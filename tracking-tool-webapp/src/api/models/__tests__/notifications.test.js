import notifications from '../notifications';
import { ApiCore } from '../../utilities/core';

describe('api/models/notifications', () => {
	describe('Notifications', () => {
		it('Should initialize an instance of Apicore', async () => {
			expect(notifications).toBeInstanceOf(ApiCore);
		});
	});
});
