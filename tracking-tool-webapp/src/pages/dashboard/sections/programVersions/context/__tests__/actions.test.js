import React from 'react';
import { ProgramVersionsDataProvider, useProgramVersionsContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import ProgramVersionsActionFactory from '../actions';
import * as toastModule from 'helpers/toast';
import jwt_decode from 'jwt-decode';

jest.mock('jwt-decode');
const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<ProgramVersionsDataProvider>{children}</ProgramVersionsDataProvider>
	);
	const { result } = renderHook(() => useProgramVersionsContext(), { wrapper });
	return result;
};
const mockResponse = { success: true, data: [] };

describe('ProgramVersions/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = ProgramVersionsActionFactory();
	});
	describe('Check if components or functions are defined', () => {
		it('Should onLoadProgramVersions be defined', () => {
			const onLoadProgramVersions = factory.onLoadProgramVersions;
			expect(typeof onLoadProgramVersions).toBe('function');
		});
		it('Should onImportFiles be defined', () => {
			const onImportFiles = factory.onImportFiles;
			expect(typeof onImportFiles).toBe('function');
		});
		it('Should onRemoveReports be defined', () => {
			const onRemoveReports = factory.onRemoveReports;
			expect(typeof onRemoveReports).toBe('function');
		});
		it('Should OnSendEvaluationReports be defined', () => {
			const OnSendEvaluationReports = factory.OnSendEvaluationReports;
			expect(typeof OnSendEvaluationReports).toBe('function');
		});
		it('Should define the onLoadStatus function', () => {
			const onLoadStatus = factory.onLoadProgramVersionsStatus;
			expect(typeof onLoadStatus).toBe('function');
		});
		it('Should define the onLoadPrograms function', () => {
			const onLoadPrograms = factory.onLoadPrograms;
			expect(typeof onLoadPrograms).toBe('function');
		});
		it('Should define the onLoadProgramVersions function', () => {
			const onLoadProgramVersions = factory.onLoadProgramVersions;
			expect(typeof onLoadProgramVersions).toBe('function');
		});
		it('Should define the onLoadCoordinators function', () => {
			const onLoadCoordinators = factory.onLoadCoordinators;
			expect(typeof onLoadCoordinators).toBe('function');
		});
	});

	describe('Handling ProgramVersion files', () => {
		beforeEach(() => {
			jwt_decode.mockImplementation(() => ({ sub: 'guid-id' }));
		});

		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get all program versions with its pagination', async () => {
			const mockResponse = {
				data: [{ name: 'Alex' }, { name: 'Diego' }],
				pagination: { size: 10, current: 1 },
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadProgramVersions({ pageNumber: 1 });
			});
			const state = result.current[0];
			expect(state.programVersions).toEqual(mockResponse.data);
			expect(state.pagination).toEqual(mockResponse.pagination);
		});

		it('Should show an error when load program failed', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				err: ['The server responded with an unexpected status.'],
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadProgramVersions(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual(mockReportResponse.err);
		});

		it('Should update the reports when importing ProgramVersion files', async () => {
			const mockPayload = 'file.json';

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onImportFiles(mockPayload);
			});
			const state = result.current[0];

			expect(state.programVersions).toEqual(mockResponse.data);
		});

		it('Should show an error when import files', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				err: ['The server responded with an unexpected status.'],
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onImportFiles(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual(mockReportResponse.err);
		});

		it('Should remove the reports when restoring the ProgramVersion files', async () => {
			const mockPayload = 'file.json';

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onRemoveReports(mockPayload);
			});
			const state = result.current[0];
			expect(state.reports).toBeNull();
		});

		it('Should show a warning toast when a evaluation is null', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: true,
				data: [{ scholar: { person: { fullname: 'test' } }, evaluation: undefined }],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const spyToast = jest.spyOn(toastModule, 'showWarningToast');

			await act(async () => {
				actions.OnSendEvaluationReports(mockPayload);
			});
			expect(spyToast).toHaveBeenCalled();
		});

		it('Should show a success toast when there are no null evaluation', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: true,
				data: [{ scholar: { person: { fullname: 'test' } }, evaluation: {} }],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const spyToast = jest.spyOn(toastModule, 'showSuccessToast');

			await act(async () => {
				actions.OnSendEvaluationReports(mockPayload);
			});
			expect(spyToast).toHaveBeenCalled();
		});

		it('Should show an error toast when an error code is reveived', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const spyToast = jest.spyOn(toastModule, 'showErrorToast');

			await act(async () => {
				actions.OnSendEvaluationReports(mockPayload);
			});
			expect(spyToast).toHaveBeenCalled();
		});

		it('Should show a success when get a stage', async () => {
			const mockPayload = 'guid-id';
			const mockReportResponse = {
				success: true,
				data: [{ stage: { person: 'frontend' } }],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetStages(mockPayload);
			});
			const state = result.current[0];
			expect(state.stages).toEqual(mockReportResponse.data);
		});

		it('Should show an error when get a stage give an error', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				err: ['The server responded with an unexpected status.'],
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetStages(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual(mockReportResponse.err);
		});

		it('Should show a success when get trainers', async () => {
			const mockReportResponse = {
				success: true,
				data: [{ trainer: { id: 'trainerId' } }],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetTrainers();
			});
			const state = result.current[0];
			expect(state.trainers[0]).toEqual(mockReportResponse.data[0]);
		});

		it('Should show an error when get a trainer give an error', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				err: ['The server responded with an unexpected status.'],
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetTrainers(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual(mockReportResponse.err);
		});

		it('Should show a success when put a new program version', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: true,
				data: [{ programVersion: { name: 'Dev32' }, evaluation: {} }],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const spyToast = jest.spyOn(toastModule, 'showSuccessToast');

			await act(async () => {
				actions.OnPutProgramVersion(mockPayload);
			});
			expect(spyToast).toHaveBeenCalled();
		});

		it('Should show an error when put a program version failed', async () => {
			const mockPayload = 'programVersion-guid-id';
			const mockReportResponse = {
				success: false,
				err: ['The server responded with an unexpected status.'],
				data: [],
			};

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockReportResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.OnPutProgramVersion(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual(mockReportResponse.err);
		});

		it('Should loadProgramVersion records', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const payload = {
				searchValue: 'searchValue',
				filterField: 'filterField',
				filterValue: 'filterValue',
			};
			await act(async () => {
				actions.searchProgramVersion(payload);
			});
			const state = result.current[0];

			expect(state.programVersions).toEqual(mockResponse.data);
		});

		it('Should get loadProgramVersion items using a filter criteria only', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const payload = { filterField: 'filterField', filterValue: 'filterValue' };
			await act(async () => {
				actions.searchProgramVersion(payload);
			});
			const state = result.current[0];

			expect(state.programVersions).toEqual(mockResponse.data);
		});

		it('Should loadProgramVersion items using a search criteria only', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			const payload = { searchValue: 'searchValue' };
			await act(async () => {
				actions.onLoadProgramVersions(payload);
			});
			const state = result.current[0];

			expect(state.programVersions).toEqual(mockResponse.data);
		});

		it('Should get coordinators items by default', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse.data),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadCoordinators();
			});
			const state = result.all[0];

			expect(state[0].coordinators).toEqual(mockResponse.data);
		});

		it('Should get programVersionStatus items by default', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse.data),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadProgramVersionsStatus();
			});
			const state = result.current[0];

			expect(state.status).toEqual(mockResponse.data);
		});

		it('Should get program items by default', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse.data),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPrograms();
			});
			const state = result.current[0];

			expect(state.programs).toEqual(mockResponse.data);
		});
	});
});
