import { act } from 'react-dom/test-utils';
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SubjectEvaluationDetailDataProvider, useSubjectEvaluationContext } from '../context';

const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<SubjectEvaluationDetailDataProvider>{children}</SubjectEvaluationDetailDataProvider>
	);
	const { result } = renderHook(() => useSubjectEvaluationContext(), { wrapper });
	return result;
};
describe('src/components/subjectEvaluationDetail/context', () => {
	describe('Api responses', () => {
		it('Should change loading state with setLoading action', async () => {
			const mockResponse = { success: true, data: [] };

			global.apiScholar = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.setLoading(true);
			});
			const [state] = result.current;

			expect(state.loading).toBeTruthy();
		});

		it('Should change data state with GetById action', async () => {
			const mockResponse = { data: {}, success: true };

			global.apiScholar = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetScholarById('11221111-1d83-44d5-b264-1e17feabd322');
			});
			const [state] = result.current;

			expect(state).toBeDefined();
		});

		it('Should change error state with GetById action when receive success false', async () => {
			const mockResponse = { data: {}, success: false, error: [] };

			global.apiScholar = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetScholarById('11221111-1d83-44d5-b264-1e17feabd322');
			});
			const [state] = result.current;
			expect(state.error).toBeUndefined();
		});

		it('Should throw error state with GetById action when receive bad request', async () => {
			const mockResponse = { data: {}, success: false, error: [] };

			global.apiScholar = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetScholarById('11221111-1d83-44d5-b264-1e17feabd322');
			});
			const [state] = result.current;

			expect(state.error).toBeUndefined();
			expect(state.data).toBeUndefined();
		});

		it('Should change error attribute in state', async () => {
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onError([]);
			});
			const [state] = result.current;

			expect(state.error).toBeDefined();
			expect(state.data).toBeUndefined();
			expect(state.success).toBeFalsy();
		});
	});
});
