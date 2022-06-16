import { ApiCore } from '../../utilities/core';
import apiCandidate from '../candidates';

describe('api/models/candidates', () => {
	describe('Candidates', () => {
		it('Should initialize an instance of Apicore', async () => {
			expect(apiCandidate).toBeInstanceOf(ApiCore);
		});
	});
});
