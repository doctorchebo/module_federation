import React from 'react';
import { ProgramVersionDetailsContextProvider, useProgramVersionDetailsContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import ProgramVersionDetailsActionFactory from '../actions';

const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<ProgramVersionDetailsContextProvider>{children}</ProgramVersionDetailsContextProvider>
	);
	const { result } = renderHook(() => useProgramVersionDetailsContext(), { wrapper });
	return result;
};

const mockResponseActivities = [
	{
		id: 'be26cc70-9d07-11ec-b909-0242ac120002',
		activityType: {
			id: '7a81f304-9ce0-11ec-b909-0242ac120002',
			description: 'Postulation',
		},
		startDateTime: '2022-01-12T10:00:00',
		endDateTime: '2022-01-12T11:00:00',
		isCompleted: false,
		idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
	},
	{
		id: 'be26cc70-9d07-11ec-b909-0142ac120002',
		activityType: {
			id: '7a81f304-9ce0-11ec-b919-0242ac120002',
			description: 'Informative Talk',
		},
		startDateTime: '2022-01-22T10:00:00',
		endDateTime: '2022-01-22T10:30:00',
		isCompleted: false,
		idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
	},
];

const mockResponseProgramVersion = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd352',
		name: 'Dev33',
	},
];

describe('pages/dashboard/sections/programVersions/context/programversiondetails/actions', () => {
	let factory;
	beforeEach(() => {
		factory = ProgramVersionDetailsActionFactory();
	});
	describe('Check if functions are defined', () => {
		it('Should onLoadActivitiesByProgramVersion be defined', () => {
			const onLoadActivitiesByProgramVersion = factory.onLoadActivitiesByProgramVersion;
			expect(typeof onLoadActivitiesByProgramVersion).toBe('function');
		});
		it('Should onLoadProgramVersion be defined', () => {
			const onLoadProgramVersion = factory.onLoadProgramVersion;
			expect(typeof onLoadProgramVersion).toBe('function');
		});
		it('Should onLoadCandidatesByProgramVersion be defined', () => {
			const onLoadCandidatesByProgramVersion = factory.onLoadCandidatesByProgramVersion;
			expect(typeof onLoadCandidatesByProgramVersion).toBe('function');
		});
		it('Should onLoadPromoteCandidatesBetweenActivities be defined', () => {
			const onLoadPromoteCandidatesBetweenActivities =
				factory.onLoadPromoteCandidatesBetweenActivities;
			expect(typeof onLoadPromoteCandidatesBetweenActivities).toBe('function');
		});
		it('Should onLoadCandidatesByActivityId be defined', () => {
			const onLoadCandidatesByActivityId = factory.onLoadCandidatesByActivityId;
			expect(typeof onLoadCandidatesByActivityId).toBe('function');
		});
	});
	describe('onLoadActivitiesByProgramVersion action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get all activities by program version id', async () => {
			const mockResponse = mockResponseActivities;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadActivitiesByProgramVersion();
			});
			const state = result.current[0];
			expect(state.activities).toEqual(mockResponse);
		});
		it('Should server respond with an unexpected status', async () => {
			const mockResponse = mockResponseActivities;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadActivitiesByProgramVersion();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadProgramVersion action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get the program version by id', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponseProgramVersion }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadProgramVersion();
			});
			const state = result.current[0];
			expect(state.programVersion).toEqual({ data: mockResponseProgramVersion });
		});
		it('Should server respond with an unexpected status', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: [] }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadProgramVersion();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadActivitiesByProgramVersion', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get activities by program version id', async () => {
			const mockResponse = mockResponseActivities;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadActivitiesByProgramVersion();
			});
			const state = result.current[0];
			expect(state.activities).toEqual(mockResponse);
		});
		it('Should server respond with an unexpected status', async () => {
			const mockResponse = mockResponseActivities;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadActivitiesByProgramVersion();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('Program version details onLoadCandidatesByProgramVersion', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond with an unexpected status', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: [] }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadActivitiesByProgramVersion();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadPromoteCandidatesBetweenActivities action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should server respond the promote candidates with success status code', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ success: true }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPromoteCandidatesBetweenActivities({}, { success: true });
			});
			const state = result.current[0];
			expect(state.promoteCandidates).toBeTruthy();
		});
	});
});
