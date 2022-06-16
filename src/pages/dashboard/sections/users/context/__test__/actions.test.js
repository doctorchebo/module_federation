import React from 'react';
import { UsersDataProvider, useUsersContext } from '../usersContext';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import UsersActionFactory from '../actions';
import ServiceFactory from 'helpers/serviceFactory';
import userRolesApi from 'api/models/userRoles';
import { user } from './../../locale/en.json';

const mockResponse = { success: true, pagination: { totalCount: '' }, data: [] };

const customRenderHook = () => {
	const wrapper = ({ children }) => <UsersDataProvider>{children}</UsersDataProvider>;
	const { result } = renderHook(() => useUsersContext(), { wrapper });
	return result;
};
describe('dashboard/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = UsersActionFactory();
	});
	describe('Types', () => {
		it('Should return the onUsersLoad method', () => {
			const usersLoad = factory.onUsersLoad;
			expect(typeof usersLoad).toBe('function');
		});
		it('Should return the onRemoveReports function', () => {
			const onRemoveReports = factory.onRemoveReports;
			expect(typeof onRemoveReports).toBe('function');
		});
		it('Should return the onImportFiles function', () => {
			const onImportFiles = factory.onImportFiles;
			expect(typeof onImportFiles).toBe('function');
		});
		it('Should return the searchUser function', () => {
			const searchUser = factory.searchUser;
			expect(typeof searchUser).toBe('function');
		});
		it('Should return the onRolesload function', () => {
			const onRolesLoad = factory.onRolesLoad;
			expect(typeof onRolesLoad).toBe('function');
		});
		it('Should return the onUserUpdate function', () => {
			const onUserUpdate = factory.onUserUpdate;
			expect(typeof onUserUpdate).toBe('function');
		});
	});
	describe('Api responses', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should Api return a onUsersLoad method', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onUsersLoad();
			});
			const state = result.current[0];

			expect(state.users).toEqual(mockResponse.data);
		});
		it('Should Api return a onImportFiles method', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onImportFiles();
			});
			const state = result.current[0];

			expect(state.users).toEqual(mockResponse.data);
		});

		it('Should Api fail return a onImportFiles method', async () => {
			global.fetch = jest.fn(() =>
				Promise.reject({
					status: 400,
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onImportFiles();
			});
			const state = result.current[0];

			expect(state.users).toEqual(mockResponse.data);
		});
		it('Should change reports state with RemoveReports action', async () => {
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

		it('Should the search user action not call getAllParams directly', async () => {
			const { service } = ServiceFactory(user);
			service.getAllWithParams = jest.fn().mockReturnValue(Promise.resolve());
			const mockPayload = { criteria: 'Ale', option: 'Coordinator' };
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.searchUser(mockPayload);
			});
			expect(service.getAllWithParams).toBeCalledTimes(0);
		});

		it('Should users be empty when load user failed', async () => {
			const { service } = ServiceFactory(user);
			service.getAllWithParams = jest.fn().mockReturnValue(Promise.resolve());
			const mockPayload = { criteria: null, option: null };
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.searchUser(mockPayload);
			});
			const state = result.current[0];
			expect(state.users).toEqual([]);
		});

		it('Should the user service call onRolesLoad action once', async () => {
			userRolesApi.getAll = jest.fn().mockReturnValue(Promise.resolve());
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onRolesLoad();
			});
			expect(userRolesApi.getAll).toBeCalledTimes(1);
		});
		it('Should fail change roles state with onRolesLoad action', async () => {
			userRolesApi.getAll = jest.fn().mockReturnValue(Promise.reject(new Error('fail')));
			const result = customRenderHook();
			const actions = result.current[1];
			await act(async () => {
				actions.onRolesLoad();
			});
			const state = result.current[0];
			expect(userRolesApi.getAll).toBeCalledTimes(1);
			expect(state.errorMessages).toEqual('fail');
			expect(state.roles).toEqual([]);
		});
		it('Should Api return a onUserUpdate method', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onUserUpdate({ id: 0 });
			});
			const state = result.current[0];

			expect(state.users).toEqual(mockResponse.data);
		});
	});
});
