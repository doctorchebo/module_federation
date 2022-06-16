import apiAuth from '../auth';
import { ApiCore } from '../../utilities/core';

describe('api/models/auth', () => {
	describe('Auth', () => {
		it('Should be an instance if Apicore', async () => {
			expect(apiAuth).toBeInstanceOf(ApiCore);
		});
	});
});
