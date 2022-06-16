import { errorAction, onLoadScholar, onScholarUpdate, setLoading } from '../action';
import { scholarReducer } from '../reducer';
import apiScholar from 'api/models/scholars';

describe('src/redux/scholarSlice/action', () => {
	describe('api responses', () => {
		it('should dispatch the correct action when api works', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiScholar.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = scholarReducer(mockState, onLoadScholar(mockPayload));

			await onLoadScholar(mockPayload);

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch the correct action when api fails', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				error: {
					message: 'error',
				},
			};

			const mockState = {
				error: {
					id: 1,
				},
				loading: false,
				success: false,
			};

			apiScholar.getSingle = jest.fn(() => Promise.reject(mockResponse.data));

			const newState = scholarReducer(mockState, errorAction(mockPayload));

			await onLoadScholar(mockPayload);

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch the correct setLoading action when api works', async () => {
			const mockPayload = {
				loading: true,
			};

			const mockState = {
				loading: mockPayload,
			};

			const newState = scholarReducer(mockState, setLoading(mockPayload));

			await onLoadScholar(mockPayload);

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch the correct action when works onScholarUpdate', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiScholar.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = scholarReducer(mockState, onScholarUpdate(mockPayload));

			await onScholarUpdate(mockPayload);

			expect(newState).toEqual({
				...mockState,
			});
		});
	});
});
