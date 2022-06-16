import { SettingsActions } from './types';

const initialState = {
	allGrades: [],
	updated: false,
	loading: false,
	error: undefined,
};

export const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SettingsActions.Loading:
			return {
				...state,
				loading: action.payload,
			};
		case SettingsActions.OnGetGrades:
			return {
				...state,
				allGrades: action.payload,
			};
		case SettingsActions.OnUpdateGrades:
			return {
				...state,
				updated: action.payload,
			};
		case SettingsActions.Error:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
