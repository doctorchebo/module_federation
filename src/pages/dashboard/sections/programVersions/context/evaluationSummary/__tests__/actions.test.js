import React from 'react';
import { EvaluationSummaryContextProvider, useEvaluationSummaryContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import apiProgramVersions from 'api/models/programVersions';
import evaluationScholarsApi from 'api/models/evaluationScholars';

const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<EvaluationSummaryContextProvider>{children}</EvaluationSummaryContextProvider>
	);
	const { result } = renderHook(() => useEvaluationSummaryContext(), { wrapper });
	return result;
};

const mockPayload = 'programVersion-guid-id';

describe('ProgramVersions/context/actions', () => {
	describe('Handling ProgramVersion files', () => {
		beforeEach(() => {
			apiProgramVersions.getSingle = jest.fn();
		});

		afterEach(() => {
			apiProgramVersions.getSingle.mockRestore();
		});
		it('Should get program versions by Id', async () => {
			apiProgramVersions.getSingle.mockReturnValue(Promise.resolve());

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				await actions.onLoadProgramVersion(mockPayload);
			});

			expect(apiProgramVersions.getSingle).toBeCalledTimes(1);
		});

		it('Should show an error when load program failed', async () => {
			apiProgramVersions.getSingle.mockReturnValue(Promise.reject(new Error('fail')));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadProgramVersion(mockPayload);
			});
			expect(apiProgramVersions.getSingle).toBeCalledTimes(1);
		});

		it('Should get the stage by program version by Id', async () => {
			apiProgramVersions.getSingle.mockReturnValue(Promise.resolve());

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				await actions.onGetStages(mockPayload);
			});

			expect(apiProgramVersions.getSingle).toBeCalledTimes(1);
		});

		it('Should show an error when get the stage failed', async () => {
			apiProgramVersions.getSingle.mockReturnValue(Promise.reject(new Error('fail')));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetStages(mockPayload);
			});
			expect(apiProgramVersions.getSingle).toBeCalledTimes(1);
		});

		it('Should get all the scholar by program version Id', async () => {
			const response = {
				message: 'Success',
				error: null,
				data: [
					{
						id: '11111121-1d83-44d5-b264-1e17feabd322',
						fullName: 'scholar 1',
						actualStatus: 'Actived',
						evaluationStatus: 'Pending',
					},
					{
						id: '11111121-1d83-44d5-b264-1e17feabd322',
						fullName: 'scholar 3',
						actualStatus: 'Onhold',
						evaluationStatus: 'Failed',
					},
				],
				success: true,
			};
			evaluationScholarsApi.getSingle = jest.fn().mockReturnValue(Promise.resolve(response));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadScholars(mockPayload);
			});
			expect(evaluationScholarsApi.getSingle).toBeCalledTimes(1);
		});

		it('Should get all the scholar without scholars in pending', async () => {
			const response = {
				message: 'Success',
				error: null,
				data: [
					{
						id: '11111121-1d83-44d5-b264-1e17feabd322',
						fullName: 'scholar 2',
						actualStatus: 'Completed',
						evaluationStatus: 'Approved',
					},
				],
				success: true,
			};
			evaluationScholarsApi.getSingle = jest.fn().mockReturnValue(Promise.resolve(response));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadScholars(mockPayload);
			});
			expect(evaluationScholarsApi.getSingle).toBeCalledTimes(1);
		});

		it('Should get all the scholar with error in response', async () => {
			const response = {
				message: 'False',
				error: ['error'],
				data: [],
				success: false,
			};
			evaluationScholarsApi.getSingle = jest.fn().mockReturnValue(Promise.resolve(response));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadScholars(mockPayload);
			});
			expect(evaluationScholarsApi.getSingle).toBeCalledTimes(1);
		});

		it('Should show an error when load scholars failed', async () => {
			evaluationScholarsApi.getSingle = jest
				.fn()
				.mockReturnValue(Promise.reject(new Error('fail')));
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadScholars(mockPayload);
			});

			expect(evaluationScholarsApi.getSingle).toBeCalledTimes(1);
		});

		it('Should send evaluations report', async () => {
			apiProgramVersions.getSingle.mockReturnValue(Promise.resolve());
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.OnSendEvaluationReports(mockPayload);
			});

			expect(apiProgramVersions.getSingle).toBeCalledTimes(1);
		});
	});
});
