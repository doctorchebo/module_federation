import React from 'react';
import { DashBoardDataProvider, useDashBoardContext } from '../Context';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import DashboardActionFactory from '../actions';

const customRenderHook = () => {
	const wrapper = ({ children }) => <DashBoardDataProvider>{children}</DashBoardDataProvider>;
	const { result } = renderHook(() => useDashBoardContext(), { wrapper });
	return result;
};
describe('dashboard/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = DashboardActionFactory();
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
			const onAddReports = factory.onAddReports;
			expect(typeof onAddReports).toBe('function');
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

		it('Should change reports state with RemoveReports action', async () => {
			const mockResponse = { reports: [] };

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onRemoveReports();
			});
			const state = result.current[0];

			expect(state.reports).toBeNull();
		});

		it('Should change reports state with onAddReports action', async () => {
			const mockResponse = { success: true, data: ['report1'] };

			const mockPayload = Promise.resolve(mockResponse);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onAddReports(mockPayload);
			});
			const state = result.current[0];

			expect(state.reports).toEqual(mockResponse);
		});
		it('Should not change reports state with error on promise', async () => {
			const mockResponse = { success: false, data: [] };
			const mockPayload = Promise.reject({
				status: 400,
				json: () => Promise.resolve(mockResponse),
			});
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onAddReports(mockPayload);
			});
			const state = result.current[0];

			expect(state.reports).toBeNull();
		});
	});
});
