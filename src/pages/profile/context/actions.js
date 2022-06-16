import { ProfileActionTypes } from './enums';
import { decodeToken } from 'helpers/tokenDecoder';
import apiImageProfile from 'api/models/imageProfile';

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Function to open the modal of profile.
 * @param {boolean} payload - Sets the modal visible attribute.
 */
function openProfileImageModal(dispatch, payload) {
	dispatch({ type: ProfileActionTypes.openProfileImageModal, payload: payload });
}

/**
 * Action triggered remove reports.
 *
 * @param {Function} dispatch - Function to show error in modal.
 * @param {boolean} payload - boolean when don't send a image in modal.
 */
function showImageModalError(dispatch, payload) {
	dispatch({ type: ProfileActionTypes.showImageModalError, payload: payload });
}

/**
 *
 * @param {Function} dispatch - function to get the image profile of user.
 */
function onGetUserImage(dispatch) {
	const token = localStorage.getItem('token');
	const decodedToken = decodeToken();
	const userId = decodedToken.sub;
	apiImageProfile
		.getSingle(userId, token)
		.then((response) => {
			const { data, success, error } = response;
			if (success) {
				dispatch({ type: ProfileActionTypes.onGetUserImageById, payload: data });
				dispatch({ type: ProfileActionTypes.onLoad, payload: false });
			} else {
				dispatch({ type: ProfileActionTypes.errorImage, payload: error });
			}
		})
		.catch((error) => {
			dispatch({ type: ProfileActionTypes.errorImage, payload: error });
		});
}

/**
 *
 * @param {Function} dispatch - function to get the image profile of user.
 * @param {object} payload - object which contain the image.
 */
function onGetUserImageById(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiImageProfile
		.getSingle(payload, token)
		.then((response) => {
			const { data, success, error } = response;
			if (success) {
				dispatch({ type: ProfileActionTypes.onGetUserImageById, payload: data });
				dispatch({ type: ProfileActionTypes.onLoad, payload: false });
			} else {
				dispatch({ type: ProfileActionTypes.errorImage, payload: error });
			}
		})
		.catch((error) => {
			dispatch({ type: ProfileActionTypes.errorImage, payload: error });
		});
}

/**
 *
 * @param {Function} dispatch - function to change the image profile.
 * @param {object} payload - New image to update profile.
 */
function onPutUserImageById(dispatch, payload) {
	const token = localStorage.getItem('token');
	const decodedToken = decodeToken();
	payload.userId = decodedToken.sub;
	apiImageProfile
		.put(payload, token)
		.then((response) => {
			const { data, success, error } = response;
			if (success) {
				dispatch({ type: ProfileActionTypes.onGetUserImageById, payload: data });
			} else {
				dispatch({ type: ProfileActionTypes.error, payload: error });
			}
		})
		.catch((error) => {
			dispatch({ type: ProfileActionTypes.error, payload: error });
		});
}

/**
 *
 * @param {Function} dispatch -
 * @param {Array} payload -
 */
function onLoad(dispatch, payload) {
	dispatch({ type: ProfileActionTypes.onLoad, payload: payload });
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function ProfileActionFactory(dispatch) {
	return {
		openProfileImageModal: (payload) => openProfileImageModal(dispatch, payload),
		showImageModalError: (payload) => showImageModalError(dispatch, payload),
		onGetUserImage: () => onGetUserImage(dispatch),
		onPutUserImageById: (payload) => onPutUserImageById(dispatch, payload),
		onLoad: (payload) => onLoad(dispatch, payload),
		onGetUserImageById: (payload) => onGetUserImageById(dispatch, payload),
	};
}
