import {
	loadSignInAction,
	signInAction,
	loadProfileAction,
	loadRoleAction,
	logoutAction,
	loadErrorAction,
} from '../action';
import userIdentityAPI from 'api/models/subjectDetails';
import { sessionReducer } from '../reducer';

describe('src/redux/authSlice/action', () => {
	describe('api responses', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('should dispatch the correct action when the api call is successful', async () => {
			const mockPayload = {
				email: 'alex@gmail.com',
				password: '123456',
			};

			const mockResponse = {
				data: mockPayload,
			};

			const mockState = {
				isLoggedIn: {
					email: 'alex@gmail.com',
					password: '123456',
				},
				errorMessages: [],
				profile: {},
				role: '',
			};

			const newState = sessionReducer(mockState, signInAction(mockPayload));

			userIdentityAPI.signIn = jest.fn(() => Promise.resolve(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch the correct action when the api call is error', async () => {
			const mockPayload = {
				email: 'user@mail.com',
				password: 'password',
			};

			const mockResponse = {
				error: 'some error',
			};

			const mockState = {
				isLoggedIn: {
					email: 'user@mail.com',
					password: 'password',
				},
				errorMessages: [mockResponse.error],
				profile: {},
				role: '',
			};

			const newState = sessionReducer(mockState, signInAction(mockPayload));

			userIdentityAPI.signIn = jest.fn(() => Promise.reject(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch loadSignAction when the api response a error', async () => {
			const mockResponse = {
				error: 'some error',
			};

			const mockState = {
				isLoggedIn: {
					email: 'user@mail.com',
					password: 'password',
				},
				errorMessages: true,
				profile: {},
				role: '',
				signIn: true,
			};

			const newState = sessionReducer(mockState, loadErrorAction(true));

			userIdentityAPI.signIn = jest.fn(() => Promise.reject(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch loadProfile when the api works', async () => {
			const mockResponse = {
				data: {
					email: 'user@mail.com',
					password: 'password',
					role: 'admin',
				},
			};

			const mockState = {
				isLoggedIn: {
					email: 'user@mail.com',
					password: 'password',
				},
				errorMessages: [],
				profile: mockResponse.data,
				role: '',
				signIn: true,
			};

			const newState = sessionReducer(mockState, loadProfileAction(mockResponse.data));

			userIdentityAPI.signIn = jest.fn(() => Promise.resolve(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch logoutAction', async () => {
			const mockPayload = {
				email: 'user@mail.com',
				password: 'password',
			};

			const mockResponse = {
				data: {
					email: 'user@mail.com',
					password: 'password',
					role: 'admin',
				},
			};

			const mockState = {
				isLoggedIn: false,
			};

			const newState = sessionReducer({}, logoutAction(mockPayload));

			userIdentityAPI.signIn = jest.fn(() => Promise.resolve(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch loadSignAction', async () => {
			const mockResponse = {
				data: {
					email: 'user@mail.com',
					password: 'password',
					role: 'admin',
				},
			};

			const mockState = {
				signIn: false,
			};

			const newState = sessionReducer({}, loadSignInAction(false));

			userIdentityAPI.signIn = jest.fn(() => Promise.resolve(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch loadRoleAction', async () => {
			const mockResponse = {
				data: {
					email: 'user@mail.com',
					password: 'password',
					role: 'admin',
				},
			};

			const mockState = {
				role: 'admin',
			};

			const newState = sessionReducer({}, loadRoleAction(mockResponse.data.role));

			userIdentityAPI.signIn = jest.fn(() => Promise.resolve(mockResponse));

			expect(newState).toEqual({
				...mockState,
			});
		});
	});
});
