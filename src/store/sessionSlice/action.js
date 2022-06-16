import userAuthenticationAPI from 'api/models/userAuthentication';
import LoggerService from 'services/LoggerService';
import userIdentityAPI from 'api/models/userIdentity';
import { ApplicationActions } from './types';

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function loadSignInAction(payload) {
	return {
		type: ApplicationActions.loadSignIn,
		payload,
	};
}

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function signInAction(payload) {
	return {
		type: ApplicationActions.signIn,
		payload,
	};
}

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function loadProfileAction(payload) {
	return {
		type: ApplicationActions.profile,
		payload,
	};
}

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function loadRoleAction(payload) {
	return {
		type: ApplicationActions.role,
		payload,
	};
}

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function logoutAction(payload) {
	return {
		type: ApplicationActions.logout,
		payload,
	};
}

/**
 *
 * @param {object} payload - The payload to be sent to the server.
 * @returns {object} - The action to be dispatched.
 */
export function loadErrorAction(payload) {
	return {
		type: ApplicationActions.error,
		payload,
	};
}

export const onLoadSignIn = (payload) => {
	return (dispatch) => {
		dispatch(loadSignInAction(true));
		const complement = 'login';
		userAuthenticationAPI
			.post(payload, '', complement)
			.then((response) => {
				const token = response.data[0];
				const complement = 'profile';
				LoggerService.info('Signin successful');
				localStorage.setItem('token', token);
				return userIdentityAPI.getAllWithParams('', token, complement);
			})
			.then((response) => {
				const profile = response.data;
				dispatch(signInAction(true));
				dispatch(loadProfileAction(profile));
				dispatch(loadRoleAction(profile.roles[0].name));
			})
			.catch((err) => {
				LoggerService.error(err.message);
				dispatch(loadSignInAction(false));
				dispatch(loadErrorAction(err.message));
			})
			.finally(() => {
				dispatch(loadSignInAction(false));
			});
	};
};

/**
 * @returns {Promise<void>}
 */
export function onLogout() {
	return (dispatch) => {
		const complement = 'logout';
		const token = localStorage.getItem('token');
		userAuthenticationAPI
			.post(null, token, complement)
			.then(() => {
				LoggerService.info('Logout successfully');
			})
			.catch((err) => {
				LoggerService.error(err.message);
				dispatch(loadErrorAction(err.message));
			})
			.finally(() => {
				localStorage.removeItem('token');
				dispatch(logoutAction(false));
				dispatch(loadProfileAction(null));
				dispatch(loadRoleAction(null));
			});
	};
}
