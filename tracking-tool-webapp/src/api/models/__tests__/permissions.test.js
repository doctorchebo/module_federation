import apiPermissions from '../permissions';
import { ApiCore } from '../../utilities/core';

describe('api/models/permissions', () => {
	describe('Permissions', () => {
		it('Should initialize an instance of Apicore', async () => {
			expect(apiPermissions).toBeInstanceOf(ApiCore);
		});
	});
});
