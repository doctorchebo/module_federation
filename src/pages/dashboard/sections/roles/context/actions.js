import { RolesActionTypes } from './enums';
import apiRoles from 'api/models/roles';
import apiPermissions from 'api/models/permissions';
import LoggerService from 'services/LoggerService';
import locale from '../locale/en.json';
import { showSuccessToast, showErrorToast } from 'helpers/toast';

const BULK_EDIT_COMPLEMENT = 'bulk';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onLoadRoles(dispatch, payload) {
	dispatch({ type: RolesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiRoles
		.getAllWithParams(payload, token)
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: RolesActionTypes.loadRoles,
				payload: { data, pagination },
			});
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => dispatch({ type: RolesActionTypes.loading, payload: false }));
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 */
function onLoadPermissions(dispatch) {
	dispatch({ type: RolesActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	apiPermissions
		.getAll(token)
		.then((response) => {
			dispatch({ type: RolesActionTypes.loadPermissions, payload: response });
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => {
			dispatch({ type: RolesActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Event object to be created.
 * @returns {object} returns the role saved or an error
 */
function onRoleSave(dispatch, payload) {
	const token = localStorage.getItem('token');
	return apiRoles
		.post(payload, token)
		.then((response) => {
			showSuccessToast({
				title: locale.createSuccess,
			});
			return {
				...response,
				success: true,
			};
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
			return {
				...error,
				success: false,
			};
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Role to update
 */
function onPutRole(dispatch, payload) {
	const token = localStorage.getItem('token');
	const { data, handleRedirect } = payload;
	dispatch({ type: RolesActionTypes.loading, payload: true });
	apiRoles
		.put(data, token, data.id)
		.then((response) => {
			dispatch({ type: RolesActionTypes.loading, payload: false });
			showSuccessToast({
				title: locale.updateSuccess,
			});
			handleRedirect();
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
			showErrorToast({
				title: locale.updateFailed,
			});
			return {
				...error,
				success: false,
			};
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Role id
 */
function onRoleDelete(dispatch, payload) {
	const token = localStorage.getItem('token');
	dispatch({ type: RolesActionTypes.loading, payload: true });
	apiRoles
		.deleteSingle(payload, token)
		.then(() => {
			onLoadRoles(dispatch, { page: 1 });
			showSuccessToast({
				title: locale.deleteSuccess,
			});
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => {
			dispatch({ type: RolesActionTypes.loading, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - Role to update
 */
function onBulkEditRoles(dispatch, payload) {
	const token = localStorage.getItem('token');
	const { data, handleRedirect } = payload;
	dispatch({ type: RolesActionTypes.loading, payload: true });
	apiRoles
		.put(data, token, BULK_EDIT_COMPLEMENT)
		.then((response) => {
			dispatch({ type: RolesActionTypes.loading, payload: false });
			showSuccessToast({
				title: locale.updateBulkSuccess,
			});
			handleRedirect();
		})
		.catch((error) => {
			dispatch({ type: RolesActionTypes.Error, payload: error.message });
			LoggerService.error(error);
			showErrorToast({
				title: locale.updateBulkFailed,
			});
			return {
				...error,
				success: false,
			};
		});
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function RolesActionFactory(dispatch) {
	return {
		onLoadRoles: (payload) => onLoadRoles(dispatch, payload),
		onLoadPermissions: () => onLoadPermissions(dispatch),
		onRoleSave: (payload) => onRoleSave(dispatch, payload),
		onPutRole: (payload) => onPutRole(dispatch, payload),
		onRoleDelete: (payload) => onRoleDelete(dispatch, payload),
		onBulkEditRoles: (payload) => onBulkEditRoles(dispatch, payload),
	};
}
