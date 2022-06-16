import produce from 'immer';
import { ProfileActionTypes } from './enums';
import locale from '../locale/en.json';

/**
 * Set an initial state for profile view.
 *
 * @returns {object} - new state
 */
export function State() {
	return {
		showModalProfile: false,
		errorModal: false,
		userImage: undefined,
		error: undefined,
		loading: true,
	};
}

/**
 * Reducer for profile view.
 *
 * @param {object} state - actual state
 * @param {object} action - actions
 * @returns {object} - new state
 */
export function Reducer(state, action) {
	const { type, payload } = action;
	return produce(state, (draft) => {
		switch (type) {
			case ProfileActionTypes.openProfileImageModal:
				draft.showModalProfile = payload;
				break;
			case ProfileActionTypes.onGetUserImageById:
				draft.userImage = payload;
				break;
			case ProfileActionTypes.onLoad:
				draft.loading = payload;
				break;
			case ProfileActionTypes.error:
				draft.error = payload;
				draft.loading = false;
				break;
			case ProfileActionTypes.showImageModalError:
				draft.errorModal = payload;
				break;
			case ProfileActionTypes.errorImage:
				draft.error = payload;
				draft.userImage = { providerImageKey: locale.imageUser };
				draft.loading = false;
				break;
			default:
				return state;
		}
	});
}
