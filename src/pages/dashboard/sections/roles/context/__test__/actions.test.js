import RolesActionFactory from '../actions';
import { RolesActionTypes } from '../enums';
import { act } from 'react-dom/test-utils';
import LoggerService from 'services/LoggerService';
import apiRoles from 'api/models/roles';

describe('dashboard/context/actions', () => {
	let factory;
	let mockedDispatch;
	beforeEach(() => {
		mockedDispatch = jest.fn();
		factory = RolesActionFactory(mockedDispatch);
	});
	describe('Types', () => {
		it('Should return the onRolesLoad method', () => {
			const rolesLoad = factory.onLoadRoles;
			expect(typeof rolesLoad).toBe('function');
		});
	});
	describe('api response', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('should dispatch an error action if the api call fails', async () => {
			const mockResponse = {
				message: ['fetch is not defined'],
			};
			apiRoles.getAllWithParams = jest.fn().mockRejectedValue(mockResponse);
			LoggerService.error = jest.fn();
			await act(async () => {
				await factory.onLoadRoles();
			});
			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(3);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: RolesActionTypes.loading,
				payload: true,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(2, {
				type: RolesActionTypes.Error,
				payload: mockResponse.message,
			});
			expect(LoggerService.error).toHaveBeenCalled();
			expect(LoggerService.error).toHaveBeenCalledTimes(1);
			expect(mockedDispatch).toHaveBeenNthCalledWith(3, {
				type: RolesActionTypes.loading,
				payload: false,
			});
		});
		it('Should dispatch the onLoadRoles method', async () => {
			const mockResponse = {
				pagination: {
					currentPage: 1,
				},
				data: [
					{
						id: 1,
					},
				],
			};

			apiRoles.getAllWithParams = jest.fn().mockResolvedValue(mockResponse);
			LoggerService.error = jest.fn();
			await act(async () => {
				await factory.onLoadRoles();
			});
			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(3);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: RolesActionTypes.loading,
				payload: true,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(2, {
				type: RolesActionTypes.loadRoles,
				payload: mockResponse,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(3, {
				type: RolesActionTypes.loading,
				payload: false,
			});
		});
	});
});
