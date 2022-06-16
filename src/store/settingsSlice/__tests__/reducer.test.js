import apiGrade from 'api/models/grade';
import { onLoadGrades, onUpdateGrades } from '../action';
import { settingsReducer } from '../reducer';

describe('src/redux/settingsSlice/action', () => {
	describe('api responses', () => {
		it('should dispatch onLoadGrade the correct action when api works', async () => {
			const mockResponse = {
				data: [
					{
						id: 1,
						name: 'A',
						color: '#ff0000',
						value: '10',
					},
					{
						id: 1,
						name: 'B',
						color: '#ff00ff',
						value: '9',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};
			apiGrade.getAll = jest.fn(() => Promise.resolve(mockResponse.data));
			const newState = settingsReducer(mockState, onLoadGrades());
			await onLoadGrades();

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch onLoadGrade the correct action when the api call is error', () => {
			const mockResponse = {
				error: 'some error',
			};

			const mockState = {
				allGrades: [],
				updated: false,
				loading: false,
				error: mockResponse.error,
			};

			const newState = settingsReducer(mockState, onLoadGrades());

			apiGrade.getAll = jest.fn(() => Promise.reject(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch onUpdateGrades the correct action when api works', async () => {
			const mockPayload = [
				{
					id: 1,
					color: '#ff0000',
				},
				{
					id: 2,
					color: '#ff00ff',
				},
			];

			const mockResponse = {
				data: [
					{
						id: 1,
						name: 'A',
						color: '#ff0000',
						value: '10',
					},
					{
						id: 2,
						name: 'B',
						color: '#ff00ff',
						value: '9',
					},
				],
			};

			const mockState = {
				allGrades: [
					{
						id: 1,
						name: 'A',
						color: '#ff0000',
						value: '10',
					},
					{
						id: 2,
						name: 'B',
						color: '#ff00ff',
						value: '9',
					},
				],
				updated: false,
				loading: false,
				error: undefined,
			};
			apiGrade.put = jest.fn(() => Promise.resolve(mockResponse.data));
			const newState = settingsReducer(mockState, onUpdateGrades(mockPayload));
			await onLoadGrades(mockPayload);

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch onUpdateGrades the correct action when the api call is error', () => {
			const mockPayload = [
				{
					id: 1,
					color: '#ff0000',
				},
				{
					id: 2,
					color: '#ff00ff',
				},
			];

			const mockResponse = {
				error: 'some error',
			};

			const mockState = {
				allGrades: [],
				updated: false,
				loading: false,
				error: mockResponse.error,
			};

			const newState = settingsReducer(mockState, onUpdateGrades(mockPayload));

			apiGrade.put = jest.fn(() => Promise.reject(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
	});
});
