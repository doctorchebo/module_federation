import apiUsersImport from '../usersImport';
import { ApiCore } from '../../utilities/core';

describe('api/models/permissions', () => {
	describe('UsersImport', () => {
		it('Should initialize an instance of Apicore', async () => {
			expect(apiUsersImport).toBeInstanceOf(ApiCore);
		});
	});
});
