import React from 'react';
import { ApplicationDataProvider, useApplication } from '../AppContext';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import ApplicationActionFactory from '../actions';
import LoggerService from 'services/LoggerService';
import { languages } from 'application/enums';
import englishMessages from 'application/languages/en-US.json';
import spanishMessages from 'application/languages/es-BO.json';

const customRenderHook = () => {
	const wrapper = ({ children }) => <ApplicationDataProvider>{children}</ApplicationDataProvider>;
	const { result } = renderHook(() => useApplication(), { wrapper });
	return result;
};

const userId = '0db49517-9dc3-4912-ab69-405597af1f9e';
jest.mock('helpers/tokenDecoder', () => ({
	decodeToken: () => ({ sub: `${userId}` }),
}));

describe('application/context/actions', () => {
	let factory;
	beforeEach(() => {
		factory = ApplicationActionFactory();
	});
	describe('Types', () => {
		it('Should return the sign in method', () => {
			const signIn = factory.onSignIn;
			expect(typeof signIn).toBe('function');
		});
		it('Should return the logout method', () => {
			const logout = factory.onLogout;
			expect(typeof logout).toBe('function');
		});
		it('Should return the onDashboard method', () => {
			const dashboard = factory.onDashboard;
			expect(typeof dashboard).toBe('function');
		});
		it('Should define onLocaleChange function', () => {
			const changeIdiom = factory.onChangeIdiom;
			expect(typeof changeIdiom).toBe('function');
		});
		it('should return the loadNotifications function', () => {
			const loadNotificationsFunction = factory.onNotificationsLoad;
			expect(typeof loadNotificationsFunction).toBe('function');
		});
	});
	describe('change Idiom change state', () => {
		it('should change to spanish', () => {
			const result = customRenderHook();
			const actions = result.current[1];
			act(() => {
				actions.onChangeIdiom(languages.spanish);
			});
			const state = result.current[0];
			expect(state.locale).toBe(languages.spanish);
			expect(state.messages).toBe(spanishMessages);
		});
		it('should change to english', () => {
			const result = customRenderHook();
			const actions = result.current[1];
			act(() => {
				actions.onChangeIdiom(languages.english);
			});
			const state = result.current[0];
			expect(state.locale).toBe(languages.english);
			expect(state.messages).toBe(englishMessages);
		});
	});

	describe('Api responses', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should Api return a Profile method with the status bad request', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
					json: () => Promise.resolve({ error: ['Bad Request'] }),
				})
			);

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onProfile();
			});

			const getSpy = (type) => {
				const logger = LoggerService;
				return { logger, spy: jest.spyOn(logger, type) };
			};

			const { logger, spy } = getSpy('error');
			logger.error('test error');
			expect(spy).toHaveBeenCalledTimes(1);
		});
		it('Should Api return a Profile method with the status does not 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 401,
				})
			);

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onProfile();
			});

			const getSpy = (type) => {
				const logger = LoggerService;
				return { logger, spy: jest.spyOn(logger, type) };
			};

			const { logger, spy } = getSpy('error');
			logger.error('test error');
			expect(spy).toHaveBeenCalledTimes(5);
			expect(spy.mock.calls).toEqual([
				['401'],
				['401'],
				[['The server responded with an unexpected status.']],
				[['The server responded with an unexpected status.']],
				['test error'],
			]);
		});
		it('Should return dashboard', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 401,
				})
			);

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onDashboard();
			});

			const getSpy = (type) => {
				const logger = LoggerService;
				return { logger, spy: jest.spyOn(logger, type) };
			};

			const { logger, spy } = getSpy('error');
			logger.error('test error');
			expect(spy).toHaveBeenCalledTimes(7);
			expect(spy.mock.calls).toEqual([
				['401'],
				['401'],
				[['The server responded with an unexpected status.']],
				[['The server responded with an unexpected status.']],
				[['Network request failed']],
				[['Network request failed']],
				['test error'],
			]);
		});
		it('should load notifications of user', async () => {
			const mockResponse = [
				{
					id: '9d2b7819-6cfb-420e-aaf6-cc7671074695',
					userId: userId,
					title: 'notifications title',
					description: 'notifications description',
					type: 'event',
					isRead: false,
				},
				{
					id: 'ee901cd8-4e79-4bf9-b088-ed6aaceabe39',
					userId: userId,
					title: 'notifications title',
					description: 'notifications description',
					type: 'event',
					isRead: false,
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
				actions.onNotificationsLoad();
			});
			const state = result.current[0];

			expect(state.notifications.viewed).toBeFalsy();
			expect(state.notifications.list).toHaveLength(2);
		});
		it('Should return fail notifications load', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 400,
				})
			);

			const result = customRenderHook();
			const actions = result.current[1];

			await act(async () => {
				actions.onNotificationsLoad();
			});

			const getSpy = (type) => {
				const logger = LoggerService;
				return { logger, spy: jest.spyOn(logger, type) };
			};

			const { logger, spy } = getSpy('error');
			logger.error('test error');
			expect(spy).toHaveBeenCalledTimes(5);
			expect(spy.mock.calls).toHaveLength(5);
		});
		it('should update the notifications', () => {
			const result = customRenderHook();
			const actions = result.current[1];

			act(() => {
				actions.onNotificationsUpdate({ list: [], viewed: true });
			});
			const state = result.current[0];

			expect(state.notifications.viewed).toBeTruthy();
			expect(state.notifications.list).toHaveLength(0);
		});
	});
	describe('SideBar actions state changes', () => {
		it('should hideSideBar', () => {
			const result = customRenderHook();
			const actions = result.current[1];
			act(() => {
				actions.onHideSidebar();
			});
			const state = result.current[0];
			expect(state.dimmed).toBeFalsy();
			expect(state.sidebarHistory).toStrictEqual([]);
		});
		it('should addViewToSideBar', () => {
			const mockView = {
				header: { back: 'content' },
				content: <div />,
				footer: null,
			};

			const result = customRenderHook();
			const actions = result.current[1];
			act(() => {
				actions.onSidebarAddView(mockView);
			});
			const state = result.current[0];
			expect(state.dimmed).toBeTruthy();
			expect(state.sidebarHistory).toHaveLength(1);
		});
		it('should removeViewFromSidebar', () => {
			const mockView = {
				header: { back: 'content' },
				content: <div />,
				footer: null,
			};

			const result = customRenderHook();
			const actions = result.current[1];
			act(() => {
				actions.onSidebarAddView(mockView);
				actions.onSidebarPopView();
			});
			const state = result.current[0];
			expect(state.dimmed).toBeTruthy();
			expect(state.sidebarHistory).toHaveLength(0);
		});
	});
});
