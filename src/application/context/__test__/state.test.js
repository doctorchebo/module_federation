import { State, Reducer } from '../state';
import { ApplicationActions, languages } from '../../enums';
import spanishMessages from 'application/languages/es-BO.json';

describe('application/context/state', () => {
	describe('State', () => {
		it('Should return the initial state', () => {
			const actualState = State();
			expect(actualState.isLoggedIn).toBeFalsy();
		});
	});
	describe('Change State', () => {
		let state;
		beforeEach(() => {
			state = {
				isLoggedIn: false,
				profile: {},
				sidebarHistory: [
					{
						header: null,
						footer: null,
					},
				],
			};
		});
		it('Sign In action', () => {
			const newState = Reducer(state, { type: ApplicationActions.SignIn, payload: true });
			expect(newState.isLoggedIn).toBeTruthy();
		});
		it('Logout action', () => {
			const newState = Reducer(state, { type: ApplicationActions.Logout, payload: false });
			expect(newState.isLoggedIn).toBeFalsy();
		});
		it('Profile action', () => {
			const newState = Reducer(state, {
				type: ApplicationActions.Profile,
				payload: { firstName: 'Rodolfo' },
			});
			expect(newState.profile.firstName).toBe('Rodolfo');
		});
		test('Should change the locale from English to Spanish', () => {
			const newState = Reducer(state, {
				type: ApplicationActions.Idiom,
				payload: {
					locale: languages.spanish,
					messages: spanishMessages,
				},
			});
			expect(newState.locale).toBe(languages.spanish);
		});
		test('Should change the notifications', () => {
			const dateMock = new Date().toDateString();
			const newState = Reducer(state, {
				type: ApplicationActions.onLoadNotifications,
				payload: [
					{
						title: 'title',
						description: 'description',
						isRead: false,
						createdAt: dateMock,
					},
				],
			});
			expect(newState.notifications.viewed).toBeFalsy();
			expect(newState.notifications.list[0].title).toBe('title');
			expect(newState.notifications.list[0].description).toBe('description');
			expect(newState.notifications.list[0].isRead).toBeFalsy();
			expect(newState.notifications.list[0].createdAt).toBe(dateMock);
		});
		test('Should update the notifications', () => {
			const dateMock = new Date().toDateString();
			const newNotification = {
				title: 'title',
				description: 'description',
				isRead: false,
				createdAt: dateMock,
			};
			const newState = Reducer(state, {
				type: ApplicationActions.onNotificationUpdate,
				payload: {
					list: [newNotification],
					viewed: false,
				},
			});
			expect(newState.notifications.viewed).toBeFalsy();
			expect(newState.notifications.list[0].title).toBe(newNotification.title);
			expect(newState.notifications.list[0].description).toBe(newNotification.description);
			expect(newState.notifications.list[0].isRead).toBeFalsy();
			expect(newState.notifications.list[0].createdAt).toBe(dateMock);
		});

		test('Should clear the sidebar history', () => {
			const newState = Reducer(state, { type: ApplicationActions.onSidebarClear });
			expect(newState.sidebarHistory).toHaveLength(0);
		});
	});
});
