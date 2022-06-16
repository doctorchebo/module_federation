import { setLoading, loadErrorAction } from '../action';
import { programVersionsActionTypes } from '../types';
describe('src/redux/programVersionSlice/action', () => {
	describe('loadErrorAction', () => {
		it('should return the loadErrorAction action', () => {
			const payload = {
				error: 'error',
				message: 'message',
			};
			const expectedAction = {
				type: programVersionsActionTypes.error,
				payload,
			};
			expect(loadErrorAction(payload)).toEqual(expectedAction);
		});
		it('should return the setLoading action', () => {
			const payload = {
				loading: true,
			};
			const expectedAction = {
				type: programVersionsActionTypes.loading,
				payload,
			};
			expect(setLoading(payload)).toEqual(expectedAction);
		});
	});
});
