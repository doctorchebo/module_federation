import React from 'react';
import { ScholarsDataProvider, useScholarsContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import UsersActionFactory from '../actions';

const customRenderHook = () => {
	const wrapper = ({ children }) => <ScholarsDataProvider>{children}</ScholarsDataProvider>;
	const { result } = renderHook(() => useScholarsContext(), { wrapper });
	return result;
};
const mockResponse = { success: true, data: [] };
describe('scholars/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = UsersActionFactory();
	});
	describe('Check if functions are defined', () => {
		it('Should onLoadScholars be defined', () => {
			const onLoadScholars = factory.onLoadScholars;
			expect(typeof onLoadScholars).toBe('function');
		});
		it('Should onImportFiles be defined', () => {
			const onImportFiles = factory.onImportFiles;
			expect(typeof onImportFiles).toBe('function');
		});
		it('Should onRemoveReports be defined', () => {
			const onRemoveReports = factory.onRemoveReports;
			expect(typeof onRemoveReports).toBe('function');
		});
		it('Should openRightSideBarEvent be defined', () => {
			const openRightSideBarEvent = factory.openRightSideBarEvent;
			expect(typeof openRightSideBarEvent).toBe('function');
		});
		it('Should onSelectScholar be defined', () => {
			const onSelectScholar = factory.onSelectScholar;
			expect(typeof onSelectScholar).toBe('function');
		});
		it('Should onLoadProgramsInProgress be defined', () => {
			const onLoadProgramsInProgress = factory.onLoadProgramsInProgress;
			expect(typeof onLoadProgramsInProgress).toBe('function');
		});

		it('Should define the searchScholar function', () => {
			const searchScholar = factory.searchScholar;
			expect(typeof searchScholar).toBe('function');
		});

		it('Should define the onLoadStatus function', () => {
			const onLoadStatus = factory.onLoadStatus;
			expect(typeof onLoadStatus).toBe('function');
		});

		it('Should define the onLoadProgramVersions function', () => {
			const onLoadProgramVersions = factory.onLoadProgramVersions;
			expect(typeof onLoadProgramVersions).toBe('function');
		});
	});
	describe('Handling Scholar files', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get all scholar with its pagination', async () => {
			const mockResponse = {
				data: [{ name: 'Alan' }, { name: 'Diego' }],
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
				actions.onLoadScholars({ pageNumber: 1 });
			});
			const state = result.current[0];

			expect(state.scholars).toEqual(mockResponse.data);
			expect(state.pagination).toEqual(mockResponse.pagination);
		});

		it('Should update the reports when importing Scholar files', async () => {
			const mockPayload = 'file.json';
			const mockResponse = {
				success: true,
				data: [{ fileName: 'file.csv', status: 'success' }],
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
				actions.onImportFiles(mockPayload);
			});
			const state = result.current[0];

			expect(state.reports).toEqual(mockResponse);
		});
	});
	describe('onLoadProgramsInProgress action', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get all programs in progress', async () => {
			const mockResponse = [
				{
					id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
					name: 'Dev31',
					status: 'InProgress',
				},
			];

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onLoadProgramsInProgress();
			});
			const state = result.current[0];

			expect(state.programsInProgress).toEqual(mockResponse);
		});
	});
	it('Should change the selectedScholar attribute in state', () => {
		const mockResponse = { id: 'test', name: 'edson' };

		const result = customRenderHook();
		const actions = result.current[1];

		act(() => {
			actions.onSelectScholar(mockResponse);
		});
		const state = result.current[0];

		expect(state.selectedScholar.id).toEqual('test');
		expect(state.selectedScholar.name).toEqual('edson');
	});
	it('Should change the rightSideBar attribute in state', () => {
		const mockResponse = { rightSideBar: true, showEventForm: true };

		const result = customRenderHook();
		const actions = result.current[1];

		act(() => {
			actions.openRightSideBarEvent(mockResponse);
		});
		const state = result.current[0];

		expect(state.rightSideBar).toEqual(true);
		expect(state.showEventForm).toEqual(true);
	});

	it('Should change the page', () => {
		const mockResponse = true;

		const result = customRenderHook();
		const actions = result.current[1];

		act(() => {
			actions.changePaginator(mockResponse);
		});
		const state = result.current[0];

		expect(state.isChangePaginator).toEqual(true);
	});

	it('Should searchScholar records', async () => {
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
			actions.searchScholar(payload);
		});
		const state = result.current[0];

		expect(state.scholars).toEqual(mockResponse.data);
	});

	it('Should onLoadProgramVersions records', async () => {
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
			actions.onLoadProgramVersions(payload);
		});
		const state = result.current[0];

		expect(state.programVersions).toEqual(mockResponse.data);
	});
	it('Should onLoadStatus records', async () => {
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
			actions.onLoadStatus(payload);
		});
		const state = result.current[0];

		expect(state.statusType).toEqual(mockResponse.data);
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
			actions.searchScholar(payload);
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

	it('Should get StatusType items by default', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(mockResponse.data),
			})
		);
		const result = customRenderHook();
		const actions = result.current[1];
		await act(async () => {
			actions.onLoadStatus();
		});
		const state = result.all[0];

		expect(state[0].statusType).toEqual(mockResponse.data);
	});

	it('Should get ProgramVersions items by default', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(mockResponse.data),
			})
		);
		const result = customRenderHook();
		const actions = result.current[1];
		await act(async () => {
			actions.onLoadProgramVersions();
		});
		const state = result.all[0];

		expect(state[0].programVersions).toEqual(mockResponse.data);
	});
});
