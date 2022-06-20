import React from 'react';
import { ProfileProvider, useProfileContext } from '..';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import jwt_decode from 'jwt-decode';

jest.mock('jwt-decode');
const customRenderHook = () => {
	const wrapper = ({ children }) => <ProfileProvider>{children}</ProfileProvider>;
	const { result } = renderHook(() => useProfileContext(), { wrapper });
	return result;
};

describe('pages/profile/components/context/actions', () => {
	describe('test context of profile', () => {
		beforeEach(() => {
			jwt_decode.mockImplementation(() => {
				return { sub: 'guid-id' };
			});
		});

		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should get User Image By Id', async () => {
			const mockResponse = {
				data: [
					{
						id: '16d3d984-672d-4e31-90e1-4206375a4b9b',
						providerImageKey: 'image',
					},
				],
				success: true,
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
				actions.onGetUserImageById();
			});
			const state = result.current[0];

			expect(state.userImage).toEqual(mockResponse.data);
		});
		it('Should get User Image By Id with an error', async () => {
			const mockResponse = {
				data: [],
				success: false,
				error: 'error',
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
				actions.onGetUserImageById();
			});
			const state = result.current[0];

			expect(state.error).toEqual(mockResponse.error);
		});

		it('Should not get an image of user', async () => {
			const mockResponse = [];

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetUserImageById();
			});
			const state = result.current[0];

			expect(state.error).toBeDefined();
		});

		it('Should update an image of scholar', async () => {
			const mockResponse = {
				Id: 'guid-id',
				Image: 'imageBase64',
				Size: 500,
				data: 'image',
				success: true,
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
				actions.onPutUserImageById(mockResponse);
			});
			const state = result.current[0];

			expect(state.userImage).toEqual(mockResponse.data);
		});

		it('Should not update the image of user and return error 400', async () => {
			const mockResponse = [];

			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve(mockResponse),
				})
			);
			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onGetUserImageById();
			});
			const state = result.current[0];

			expect(state.error).toBeDefined();
		});

		it('Should be true the show modal profile', () => {
			const result = customRenderHook();
			const actions = result.current[1];

			act(() => {
				actions.openProfileImageModal(true);
			});
			const state = result.current[0];

			expect(state.showModalProfile).toBeTruthy();
		});

		it('Should be true the show image error on modal', () => {
			const result = customRenderHook();
			const actions = result.current[1];

			act(() => {
				actions.showImageModalError(true);
			});
			const state = result.current[0];

			expect(state.errorModal).toBeTruthy();
		});

		it('Should be false the loading', () => {
			const result = customRenderHook();
			const actions = result.current[1];

			act(() => {
				actions.onLoad(false);
			});
			const state = result.current[0];

			expect(state.errorModal).toBeFalsy();
		});
	});
});
