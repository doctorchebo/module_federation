import { ApplicationActions } from './types';

const initialState = {
	isLoggedIn: false,
	errorMessages: [],
	profile: {},
	role: '',
	loading: true,
	signIn: false,
	isMain: true,
	sidebarHistory: [],
	dimmed: false,
	share: {},
	notifications: {},
};

export const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case ApplicationActions.signIn:
			return { ...state, isLoggedIn: action.payload };
		case ApplicationActions.logout:
			return { ...state, isLoggedIn: false };
		case ApplicationActions.loadSignIn:
			return {
				...state,
				signIn: action.payload,
			};
		case ApplicationActions.profile:
			return {
				...state,
				profile: action.payload,
			};
		case ApplicationActions.role:
			return {
				...state,
				role: action.payload,
			};
		case ApplicationActions.loading:
			return {
				...state,
				isMain: action.payload,
				loading: action.payload,
			};
		case ApplicationActions.error:
			return {
				...state,
				errorMessages: action.payload,
			};
		case ApplicationActions.idiom:
			return {
				...state,
				locale: action.payload,
				messages: action.payload,
			};
		case ApplicationActions.onSidebarAdd:
			return {
				...state,
				sidebarHistory: [...state.sidebarHistory, action.payload],
				dimmed: true,
			};
		case ApplicationActions.onSidebarRemove:
			return {
				...state,
				sidebarHistory: state.sidebarHistory.filter((item) => item !== action.payload),
			};
		case ApplicationActions.onSidebarClear:
			return {
				...state,
				dimmed: false,
				sidebarHistory: [],
			};
		case ApplicationActions.onShareUpdate:
			return {
				...state,
				share: { ...state.share, ...action.payload },
			};
		case ApplicationActions.onNotificationUpdate:
			return {
				...state,
				notifications: action.payload,
			};
		case ApplicationActions.onLoadNotifications:
			return {
				...state,
				notifications: { list: action.payload, viewed: false },
			};
		default:
			return state;
	}
};
