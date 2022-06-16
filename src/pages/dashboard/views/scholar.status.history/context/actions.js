import apiStatusHistory from 'api/models/statusHistory';
import apiUsers from 'api/models/users';
import LoggerService from 'services/LoggerService';
import { StatusActionTypes } from './enums';

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - Scholar GUID Id.
 */
function onStatusHistoryGet(dispatch, payload) {
	dispatch({ type: StatusActionTypes.loadingStatusHistory, payload: true });
	const token = localStorage.getItem('token');
	apiStatusHistory
		.getSingle(`scholar/${payload}`, token)
		.then(async (response) => {
			LoggerService.info('Fetch Successful');
			response.data = await Promise.all(
				response.data.map(async (scholar) => {
					const user = await apiUsers.getAll(token);
					return {
						...scholar,
						user: user.data.find((u) => u.id === scholar.userId),
					};
				})
			);
			dispatch({
				type: StatusActionTypes.onStatusHistoryGet,
				payload: response.data.sort(function (a, b) {
					return new Date(b.createAt) - new Date(a.createAt);
				}),
			});
		})
		.catch((err) => {
			dispatch({ type: StatusActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: StatusActionTypes.loadingStatusHistory, payload: false });
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - One Statusistory .
 */
function onStatusHistorySelect(dispatch, payload) {
	dispatch({ type: StatusActionTypes.onStatusHistorySelect, payload });
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - One Statusistory .
 */
function onStatusHistoryUpdate(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiStatusHistory
		.put(payload, token)
		.then(async (response) => {
			dispatch({
				type: StatusActionTypes.onStatusHistoryUpdate,
				payload: { ...payload.data, description: response.data.description },
			});
			dispatch({ type: StatusActionTypes.onStatusHistorySelect, payload: {} });
		})
		.catch((err) => {
			dispatch({ type: StatusActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		})
		.finally(() => {
			dispatch({ type: StatusActionTypes.loadingStatusHistory, payload: false });
		});
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function StatusHistoryActionFactory(dispatch) {
	return {
		onStatusHistoryGet: (payload) => onStatusHistoryGet(dispatch, payload),
		onStatusHistorySelect: (payload) => onStatusHistorySelect(dispatch, payload),
		onStatusHistoryUpdate: (payload) => onStatusHistoryUpdate(dispatch, payload),
	};
}
