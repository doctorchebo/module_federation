import { onSendSubjectEvaluationReports } from '../action';
import { programVersionReducer } from '../reducer';
import programVersionsAPI from 'api/models/programVersions';

describe('src/redux/programVersionSlice/action', () => {
	describe('api responses', () => {
		it('should return data from SubjectEvaluationReport', async () => {
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

			programVersionsAPI.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = programVersionReducer(
				mockState,
				onSendSubjectEvaluationReports(mockPayload)
			);

			expect(newState).toEqual({
				...mockState,
			});
		});
	});
});
