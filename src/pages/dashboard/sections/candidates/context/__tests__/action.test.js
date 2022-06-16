import React from 'react';
import { CandidatesDataProvider, useCandidatesContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import CandidateActionFactory from '../action';

const customRenderHook = () => {
	const wrapper = ({ children }) => <CandidatesDataProvider>{children}</CandidatesDataProvider>;
	const { result } = renderHook(() => useCandidatesContext(), { wrapper });
	return result;
};

const mockResponseCandidatesStatus = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		name: 'Active',
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd321',
		name: 'Inactive',
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd320',
		name: 'On Hold',
	},
];

const mockResponseCandidate = {
	id: '4fffc534-1d83-10d1-b264-1e17f2abd322',
	fullname: 'Juan Perez',
};

const mockResponseProgramVersions = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd352',
		name: 'Dev33',
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd342',
		name: 'Dev34',
	},
];

describe('pages/dashboard/sections/candidates/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = CandidateActionFactory();
	});
	describe('Check if functions are defined', () => {
		it('Should onLoadCandidates be defined', () => {
			const onLoadCandidates = factory.onLoadCandidates;
			expect(typeof onLoadCandidates).toBe('function');
		});
		it('Should onLoadProgramVersions be defined', () => {
			const onLoadProgramVersions = factory.onLoadProgramVersions;
			expect(typeof onLoadProgramVersions).toBe('function');
		});
		it('Should onLoadStatus be defined', () => {
			const onLoadStatus = factory.onLoadStatus;
			expect(typeof onLoadStatus).toBe('function');
		});
		it('Should onCandidateUpdate be defined', () => {
			const onCandidateUpdate = factory.onCandidateUpdate;
			expect(typeof onCandidateUpdate).toBe('function');
		});
	});
	describe('onLoadCandidates action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get all candidates', async () => {
			const mockResponse = [{ id: 'ad33dadsasd', name: 'Homer Simpsons' }];
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadCandidates();
			});
			const state = result.current[0];
			expect(state.candidates).toEqual(mockResponse);
		});
		it('Should server respond with an unexpected status', async () => {
			const mockResponse = [{ id: 'ad33dadsasd', name: 'Homer Simpsons' }];
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadCandidates();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadStatus action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond get all candidates status with success status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponseCandidatesStatus }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadStatus();
			});
			const state = result.current[0];
			expect(state.statusType).toEqual(mockResponseCandidatesStatus);
		});
		it('Should server respond get all candidates status with an unexpected status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: [] }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadStatus();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadProgramVersions action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond get all program versions with success status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponseProgramVersions }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadProgramVersions();
			});
			const state = result.current[0];

			expect(state.programVersions).toEqual(mockResponseProgramVersions);
		});
		it('Should server respond get all program versions with an unexpected status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: [] }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadProgramVersions();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onCandidateUpdate action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond update candidate with success status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ success: true }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onCandidateUpdate({}, { success: true });
			});
			const state = result.current[0];
			expect(state.isUpdated).toBeTruthy();
		});
		it('Should server respond update candidate with an unexpected status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: null }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onCandidateUpdate({}, mockResponseCandidate);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onImportFiles actions', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond all candidates with success status code', async () => {
			const mockResponse = [{ id: 'ad33dfdgg3asd', name: 'Homer Simpsons' }];
			const mockPayload = 'file.csv';
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onImportFiles(mockPayload);
			});
			const state = result.current[0];
			expect(state.dataJson).toEqual(mockResponse);
		});
		it('Should server respond with an unexpected status', async () => {
			const mockResponse = [{ id: 'ad33dfdgg3asd', name: 'Homer Simpsons' }];
			const mockPayload = 'file.csv';
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onImportFiles(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onImportCandidates actions', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond all candidates with success status code', async () => {
			const mockResponse = [{ data: [] }];
			const mockPayload = [{ id: 'ad33dfdgg3asd', name: 'Homer Simpsons' }];
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onImportCandidates(mockPayload);
			});
			const state = result.current[0];
			expect(state.reports).toEqual(mockResponse);
		});
		it('Should server respond with an unexpected status', async () => {
			const mockResponse = [{ data: [] }];
			const mockPayload = [{ id: 'ad33dfdgg3asd', name: 'Homer Simpsons' }];
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onImportCandidates(mockPayload);
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
});
