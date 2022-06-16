import LoggerService from 'services/LoggerService';
import { ScholarsActionTypes } from './enums';
import apiProgramVersions from 'api/models/programVersions';

/**
 * @param {Function} dispatch - Function to load all scholar in program version by subject.
 * @param {object} payload - Program Version Id.
 */
function onLoadStage(dispatch, payload) {
	dispatch({ type: ScholarsActionTypes.loading, payload: true });
	const token = localStorage.getItem('token');
	const params = { pageNumber: payload.pageNumber, pageSize: 5 };
	const route = `${payload.programVersionId}/stage/${payload.stageId}`;

	apiProgramVersions
		.getAllWithParams(params, token, route)
		.then((response) => {
			const { data, pagination } = response;
			dispatch({
				type: ScholarsActionTypes.loadScholars,
				payload: { data, pagination },
			});
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.Error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - Program Version GUID Id.
 */
function onGetStages(dispatch, payload) {
	const route = `${payload}/stages`;
	const token = localStorage.getItem('token');
	apiProgramVersions
		.getSingle(route, token)
		.then((response) => {
			dispatch({ type: ScholarsActionTypes.getStages, payload: response });
		})
		.catch((err) => {
			dispatch({ type: ScholarsActionTypes.error, payload: err.message });
			LoggerService.error(err);
		});
}

/**
 * Factory of actions
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function ScholarsActionFactory(dispatch) {
	return {
		onLoadStage: (payload) => onLoadStage(dispatch, payload),
		onGetStages: (payload) => onGetStages(dispatch, payload),
	};
}
