import React from 'react';
import { ApprovalHistoryContextProvider, useApprovalHistoryContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import ApprovalHistoryActionFactory from '../actions';

const customRenderHook = () => {
	const wrapper = ({ children }) => (
		<ApprovalHistoryContextProvider>{children}</ApprovalHistoryContextProvider>
	);
	const { result } = renderHook(() => useApprovalHistoryContext(), { wrapper });
	return result;
};

const mockInformativeTalksInProgres = [
	{
		id: 'c00b534a-8ae8-4ff2-9028-3b8f8975042a',
		activity: {
			id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
			activityType: {
				id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
				description: 'Informative Talk',
			},
		},
		status: {
			id: 'c6d8e5b8-152b-4c24-8718-411fa4a67b78',
			description: 'InProgress',
		},
		candidate: {
			id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
			person: {
				id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
				fullName: 'Gilda Silvestre López',
				personalEmail: 'gildasilvestrelopez09@gmail.com',
			},
			profile: {
				id: '375554d2-0906-4207-8e27-bd7e638a7aa4',
				pathResume:
					'https://drive.google.com/u/2/open?usp=forms_web&id=rCQQ87cEQkWIXs0m7PCD8_jIQ',
			},
		},
	},
];
const mockPostulationsFailed = [
	{
		id: 'c00b534a-8ae8-4ff2-9028-3b8f8975042a',
		activity: {
			id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
			activityType: {
				id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
				description: 'Informative Talk',
			},
		},
		status: {
			id: 'c6d8e5b8-152b-4c24-8718-411fa4a67b78',
			description: 'Failed',
		},
		candidate: {
			id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
			person: {
				id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
				fullName: 'Gilda Silvestre López',
			},
		},
	},
];
const mockPostulationsInProgress = [
	{
		id: 'c00b534a-8ae8-4ff2-9028-3b8f8975042a',
		activity: {
			id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
			activityType: {
				id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
				description: 'Postulation',
			},
		},
		status: {
			id: 'c6d8e5b8-152b-4c24-8718-411fa4a67b78',
			description: 'inProgress',
		},
		candidate: {
			id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
			person: {
				id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
				fullName: 'Gilda Silvestre López',
			},
		},
	},
];
const mockPostulationsPassed = [
	{
		id: 'c00b534a-8ae8-4ff2-9028-3b8f8975042a',
		activity: {
			id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
			activityType: {
				id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
				description: 'Postulation',
			},
		},
		status: {
			id: 'c6d8e5b8-152b-4c24-8718-411fa4a67b78',
			description: 'Passed',
		},
		candidate: {
			id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
			person: {
				id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
				fullName: 'Gilda Silvestre López',
			},
		},
	},
];
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
];

const mockResponseProgramVersion = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd352',
		name: 'Dev33',
	},
];

describe('pages/dashboard/sections/programVersions/context/approvalHistory/actions', () => {
	let factory;
	beforeEach(() => {
		factory = ApprovalHistoryActionFactory();
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
		it('Should onLoadInfoTalksFailed be defined', () => {
			const onLoadInfoTalksFailed = factory.onLoadInfoTalksFailed;
			expect(typeof onLoadInfoTalksFailed).toBe('function');
		});
		it('Should onLoadInfoTalksApproved be defined', () => {
			const onLoadInfoTalksApproved = factory.onLoadInfoTalksApproved;
			expect(typeof onLoadInfoTalksApproved).toBe('function');
		});
		it('Should onLoadInfoTalksInProgress be defined', () => {
			const onLoadInfoTalksInProgress = factory.onLoadInfoTalksInProgress;
			expect(typeof onLoadInfoTalksInProgress).toBe('function');
		});
		it('Should onLoadPostulationsApproved be defined', () => {
			const onLoadPostulationsApproved = factory.onLoadPostulationsApproved;
			expect(typeof onLoadPostulationsApproved).toBe('function');
		});
		it('Should onLoadPostulationsFailed be defined', () => {
			const onLoadPostulationsFailed = factory.onLoadPostulationsFailed;
			expect(typeof onLoadPostulationsFailed).toBe('function');
		});
		it('Should onLoadPostulationsInProgress be defined', () => {
			const onLoadPostulationsInProgress = factory.onLoadPostulationsInProgress;
			expect(typeof onLoadPostulationsInProgress).toBe('function');
		});
	});
	describe('onLoadInfoTalksInProgress action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get informative talks with status in progress by activity id', async () => {
			const mockResponse = mockInformativeTalksInProgres;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadInfoTalksInProgress();
			});
			const state = result.current[0];
			expect(state.infTalkInProgress).toEqual(mockResponse);
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
				actions.onLoadInfoTalksInProgress();
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
	describe('onLoadPostulationsApproved action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('The server must respond to the approval postulation with a correct status code."', async () => {
			const mockResponse = mockPostulationsPassed;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsApproved();
			});
			const state = result.current[0];
			expect(state.postulantsApproved).toEqual(mockResponse);
		});
		it('The server should respond with an unexpected status', async () => {
			const mockResponse = mockPostulationsPassed;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsApproved();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadPostulationsFailed', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('onLoadPostulationsFailed action', async () => {
			const mockResponse = mockPostulationsFailed;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsFailed();
			});
			const state = result.current[0];
			expect(state.postulantsFailed).toEqual(mockResponse);
		});
		it('The server should respond with an unexpected status', async () => {
			const mockResponse = mockPostulationsFailed;
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: mockResponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsFailed();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
	describe('onLoadPostulationsInProgress action', () => {
		const mockReponse = mockPostulationsInProgress;
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('The server must respond InProgress postulation with a successful status code."', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve({ data: mockReponse }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsInProgress();
			});
			const state = result.current[0];
			expect(state.postulantsInProgress).toEqual(mockReponse);
		});
		it('The server should respond with an unexpected status', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 500,
					json: () => Promise.resolve({ data: [] }),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onLoadPostulationsInProgress();
			});
			const state = result.current[0];
			expect(state.errorMessages).toEqual([
				'The server responded with an unexpected status.',
			]);
		});
	});
});
