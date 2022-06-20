import React from 'react';
import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import apiScholar from 'api/models/scholars';
import apiScholarStageScore from 'api/models/scholarStageScore';
import apiEventsSummary from 'api/models/eventsSummary';
import apiScholarLastEvaluationSummary from 'api/models/scholarLastEvaluationSummary';
import { ScholarDetailDataProvider, useScholarDetailContext } from '../context';
import DashboardActionFactory from '../actions';
import { ScholarDetailActions } from '../enums';
import LoggerService from 'services/LoggerService';
import * as toastModule from 'helpers/toast';

const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<ScholarDetailDataProvider>{children}</ScholarDetailDataProvider>
	);
	const { result } = renderHook(() => useScholarDetailContext(), { wrapper });
	return result;
};
describe('src/components/scholarDetail/context', () => {
	let factory;
	let mockedDispatch;

	beforeEach(() => {
		mockedDispatch = jest.fn();
		factory = DashboardActionFactory(mockedDispatch);
	});
	describe('Types', () => {
		it('Should return the onError method', () => {
			const onError = factory.onError;
			expect(typeof onError).toBe('function');
		});
		it('Should return the setLoading function', () => {
			const setLoading = factory.setLoading;
			expect(typeof setLoading).toBe('function');
		});
		it('Should return the onAddReports function', () => {
			const OnGetScholarById = factory.OnGetScholarById;
			expect(typeof OnGetScholarById).toBe('function');
		});
		it('Should return the onScholarUpdate function', () => {
			const OnScholarUpdate = factory.onScholarUpdate;
			expect(typeof OnScholarUpdate).toBe('function');
		});
	});
	describe('Api responses', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should change loading state with setLoading action', async () => {
			const mockResponse = { success: true, data: [] };

			global.fetch = jest.fn(() =>
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
			const state = result.current[0];

			expect(state.loading).toBeTruthy();
		});

		it('Should change data state with GetById action', async () => {
			const mockResponse = { data: {}, success: true };

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.OnGetScholarById('guidId');
			});
			const state = result.current[0];

			expect(state.data).toBeDefined();
		});

		it('Should change error state with GetById action when receive success false', async () => {
			const mockResponse = { data: {}, success: false, error: [] };

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.OnGetScholarById('guidId');
			});
			const state = result.current[0];

			expect(state.error).toBeDefined();
		});

		it('Should throw error state with GetById action when receive bad request', async () => {
			const mockResponse = { data: {}, success: false, error: [] };

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.OnGetScholarById('guidId');
			});
			const state = result.current[0];

			expect(state.error).toBeDefined();
			expect(state.data).toBeUndefined();
		});

		it('Should change error attribute in state', async () => {
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onError([]);
			});
			const state = result.current[0];

			expect(state.error).toBeDefined();
			expect(state.data).toBeUndefined();
			expect(state.success).toBeFalsy();
		});

		it('should check execution of finally block PUT request', async () => {
			await act(async () => {
				factory.onScholarUpdate({ id: 0 });
			});
			expect(mockedDispatch).toBeCalledTimes(3);
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.Loading',
				payload: false,
			});
		});

		it('Should apit return a error when receive a bad request', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'Not null reference to object',
					},
				],
				data: {},
			};

			apiScholar.put = jest.fn().mockReturnValue(Promise.reject(mockResponse.error));

			LoggerService.error = jest.fn();
			const spyToast = jest.spyOn(toastModule, 'showErrorToast');

			await act(async () => {
				factory.onScholarUpdate({ id: -1 });
			});

			expect(LoggerService.error).toBeCalledTimes(1);
			expect(LoggerService.error).toBeCalledWith([
				{ message: 'Not null reference to object' },
			]);

			expect(spyToast).toHaveBeenCalled();

			expect(mockedDispatch).toBeCalledTimes(3);
			expect(mockedDispatch).toHaveBeenCalledWith({
				type: 'ScholarDetail.update',
				payload: true,
			});
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.Error',
				payload: mockResponse.error.message,
			});
			apiScholar.put.mockRestore();
			LoggerService.error.mockRestore();
			spyToast.mockRestore();
		});

		it('Should Api return a onScholarUpdate method', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'Resource not exists',
					},
				],
				data: {},
			};
			apiScholar.put = jest.fn().mockReturnValue(Promise.reject(mockResponse.error));

			await act(async () => {
				factory.onScholarUpdate({ id: 0 });
			});

			expect(mockedDispatch).toBeCalledTimes(3);
			expect(mockedDispatch).toHaveBeenCalledWith({
				type: 'ScholarDetail.update',
				payload: true,
			});
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.Error',
				payload: mockResponse.error.message,
			});
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.Loading',
				payload: false,
			});
			apiScholar.put.mockRestore();
		});

		it('Should Api OnGetLastStageEvaluationSkills return an response succes', async () => {
			const mockResponse = {
				success: true,
				data: {
					name: 'one',
					data: [],
				},
			};

			apiScholarLastEvaluationSummary.getAllWithParams = jest
				.fn()
				.mockReturnValue(Promise.resolve(mockResponse));

			await act(async () => {
				await factory.OnGetLastStageEvaluationSkills({
					scholarId: 1,
					programVersionId: 2,
				});
			});

			expect(mockedDispatch).toBeCalledTimes(2);
			expect(mockedDispatch).toBeCalledWith({
				type: ScholarDetailActions.OnGetLastStageEvaluationSkills,
				payload: mockResponse.data,
			});
			apiScholarLastEvaluationSummary.getAllWithParams.mockRestore();
		});

		it('Should api return a error in OnGetLastStageEvaluationSkills', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'scholarId not found',
					},
				],
				data: {
					name: 'one',
					data: [],
				},
			};

			apiScholarLastEvaluationSummary.getAllWithParams = jest
				.fn()
				.mockReturnValue(Promise.reject(mockResponse.error));

			await act(async () => {
				await factory.OnGetLastStageEvaluationSkills({
					scholarId: 1,
					programVersionId: 2,
				});
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: ScholarDetailActions.Error,
				payload: mockResponse.error,
			});
			apiScholarLastEvaluationSummary.getAllWithParams.mockRestore();
		});

		it('Should api return a response error in OnGetLastStageEvaluationSkills', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'scholarId not found',
					},
				],
				data: {},
			};

			apiScholarLastEvaluationSummary.getAllWithParams = jest
				.fn()
				.mockReturnValue(Promise.resolve(mockResponse));

			await act(async () => {
				await factory.OnGetLastStageEvaluationSkills({
					scholarId: 1,
					programVersionId: 2,
				});
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: ScholarDetailActions.ErrorLastStageEvaluationSkills,
				payload: mockResponse.error,
			});
			apiScholarLastEvaluationSummary.getAllWithParams.mockRestore();
		});

		it('Should return a score object when OnGetStageScoreByScholar request success', async () => {
			const mockResponse = {
				success: true,
				error: undefined,
				data: {
					programVersion: 'Front',
					data: [],
				},
			};

			apiScholarStageScore.getSingle = jest
				.fn()
				.mockReturnValue(Promise.resolve(mockResponse));

			await act(async () => {
				await factory.onGetStageScoreByScholar();
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.OnGetStageScoreByScholar',
				payload: mockResponse.data,
			});
			apiScholarStageScore.getSingle.mockRestore();
		});

		it('Should return an object message error when OnGetStageScoreByScholar request error', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'scholarId not found',
					},
				],
				data: {
					data: [],
				},
			};

			apiScholarStageScore.getSingle = jest
				.fn()
				.mockReturnValue(Promise.reject(mockResponse.error));

			await act(async () => {
				await factory.onGetStageScoreByScholar();
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: 'ScholarDetail.Error',
				payload: mockResponse.error,
			});
			apiScholarStageScore.getSingle.mockRestore();
		});

		it('Should Api return an success in the onCountEvent method', async () => {
			const mockResponse = {
				success: true,
				error: undefined,
				data: {
					count: 4,
					name: 'Accomplishment',
					data: [],
				},
			};

			apiEventsSummary.getSingle = jest.fn().mockReturnValue(Promise.resolve(mockResponse));

			await act(async () => {
				await factory.onCountEvents(1);
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: ScholarDetailActions.onCountEvents,
				payload: mockResponse,
			});
			apiEventsSummary.getSingle.mockRestore();
		});

		it('Should api return a error in onCountEvent', async () => {
			const mockResponse = {
				success: false,
				error: [
					{
						message: 'scholarId not found',
					},
				],
				data: {
					data: [],
				},
			};

			apiEventsSummary.getSingle = jest
				.fn()
				.mockReturnValue(Promise.reject(mockResponse.error));

			await act(async () => {
				await factory.onCountEvents(1);
			});

			expect(mockedDispatch).toBeCalledTimes(1);
			expect(mockedDispatch).toBeCalledWith({
				type: ScholarDetailActions.Error,
				payload: mockResponse.error,
			});
			apiEventsSummary.getSingle.mockRestore();
		});
	});
});
