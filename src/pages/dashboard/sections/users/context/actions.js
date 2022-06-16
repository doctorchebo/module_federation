import userIdentityAPI from 'api/models/userIdentity';
import userRolesApi from 'api/models/userRoles';
import { UsersActionTypes } from './enums';
import LoggerService from 'services/LoggerService';
import { showSuccessToast, showErrorToast } from 'helpers/toast';
import apiUsers from 'api/models/users';
import locale from 'pages/dashboard/sections/users/locale/en.json';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onUsersLoad(dispatch, payload) {
	dispatch({ type: UsersActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiUsers
		.getAllWithParams(payload, token)
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: UsersActionTypes.load,
				payload: { data, pagination },
			});
		})
		.catch((err) => {
			dispatch({ type: UsersActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: UsersActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - user object.
 */
function onUsersValidate(dispatch, payload) {
	dispatch({ type: UsersActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	userIdentityAPI
		.post(payload, token, null, {})
		.then((response) => {
			dispatch({ type: UsersActionTypes.OnImportUsers, payload: response });
			onUsersLoad(dispatch);
		})
		.catch((err) => {
			dispatch({ type: UsersActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: UsersActionTypes.loading, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function RemoveReports(dispatch) {
	dispatch({ type: UsersActionTypes.OnImportUsers, payload: null });
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - user object.
 */
function onUserUpdate(dispatch, payload) {
	dispatch({ type: UsersActionTypes.updateUser, payload: true });
	const token = localStorage.getItem('token');
	apiUsers
		.put(payload, token, payload.id)
		.then((response) => {
			dispatch({ type: UsersActionTypes.loadUsers, payload: response });
			onUsersLoad(dispatch);
			showSuccessToast({
				title: locale.updateUserForm.updateSuccess,
			});
		})
		.catch((err) => {
			dispatch({ type: UsersActionTypes.Error, payload: err.message });
			showErrorToast({
				title: locale.updateUserForm.updateError,
			});
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: UsersActionTypes.loading, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Object to change current page.
 */
function searchUser(dispatch, payload) {
	let params = {
		pageNumber: payload.pageNumber,
		pageSize: payload.pageSize,
		sort: payload.sort,
		totalPages: payload.totalPages,
		filterValue: payload.filterValue,
		filterOption: payload.filterField,
		criteria: payload.searchValue,
	};
	onUsersLoad(dispatch, params);
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onRolesLoad(dispatch) {
	const token = localStorage.getItem('token');
	userRolesApi
		.getAll(token)
		.then((response) => {
			dispatch({ type: UsersActionTypes.loadRoles, payload: response });
		})
		.catch((err) => {
			dispatch({ type: UsersActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function UsersActionFactory(dispatch) {
	return {
		onUsersLoad: (payload) => onUsersLoad(dispatch, payload),
		onImportFiles: (payload) => onUsersValidate(dispatch, payload),
		onRemoveReports: () => RemoveReports(dispatch),
		searchUser: (payload) => searchUser(dispatch, payload),
		onRolesLoad: () => onRolesLoad(dispatch),
		onUserUpdate: (payload) => onUserUpdate(dispatch, payload),
	};
}
