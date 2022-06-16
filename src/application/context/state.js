import produce from 'immer';
import { ApplicationActions, languages } from '../enums';
import englishMessages from '../languages/en-US.json';

/**
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		isLoggedIn: false,
		errorMessages: [],
		profile: {},
		role: '',
		loading: true,
		locale: languages.english,
		messages: englishMessages,
		signIn: false,
		isMain: true,
		sidebarHistory: [],
		dimmed: false,
		share: {},
		notifications: {},
	};
}
/**
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case ApplicationActions.SignIn:
				draft.isLoggedIn = payload;
				break;
			case ApplicationActions.Logout:
				draft.isLoggedIn = payload;
				break;
			case ApplicationActions.LoadSignIn:
				draft.signIn = payload;
				break;
			case ApplicationActions.Profile:
				draft.profile = payload;
				break;
			case ApplicationActions.Role:
				draft.role = payload;
				break;
			case ApplicationActions.Loading:
				draft.isMain = payload;
				draft.loading = payload;
				break;
			case ApplicationActions.Error:
				draft.errorMessages = payload;
				break;
			case ApplicationActions.Idiom:
				draft.locale = payload.locale;
				draft.messages = payload.messages;
				break;
			case ApplicationActions.onSidebarAdd:
				draft.sidebarHistory.push(payload);
				draft.dimmed = true;
				break;
			case ApplicationActions.onSidebarRemove:
				draft.sidebarHistory.pop(payload);
				break;
			case ApplicationActions.onSidebarClear:
				draft.dimmed = false;
				draft.sidebarHistory = [];
				break;
			case ApplicationActions.onShareUpdate:
				draft.share = { ...draft.share, ...payload };
				break;
			case ApplicationActions.onNotificationUpdate:
				draft.notifications = payload;
				break;
			case ApplicationActions.onLoadNotifications:
				draft.notifications = { list: payload, viewed: false };
				break;
		}
	});
}
