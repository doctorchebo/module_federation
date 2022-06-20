import apiScholar from 'api/models/scholars';
import LoggerService from 'services/LoggerService';
import { ScholarDetailActions } from './enums';

/**
 * @param {Function} dispatch - function to change state of onImporting.
 * @param {boolean} payload - path.
 */
function onGetScholarById(dispatch, payload) {
	const token = localStorage.getItem('token');
	apiScholar
		.getSingle(payload, token)
		.then((response) => {
			let { data, success, error } = response;
			if (success) {
				dispatch({ type: ScholarDetailActions.OnGetScholarById, payload: data });
			} else {
				errorAction(error, dispatch);
			}
		})
		.catch((err) => {
			LoggerService.error(err);
			errorAction(err, dispatch);
		});
}

/**
 * Set loading on true or false
 *
 * @param {Function} payload -
 * @param {Function} dispatch -
 */
function setLoading(payload, dispatch) {
	dispatch({ type: ScholarDetailActions.Loading, payload: payload });
}

/**
 *
 * @param {Array} payload -
 * @param {Function} dispatch -
 */
function errorAction(payload, dispatch) {
	dispatch({ type: ScholarDetailActions.Error, payload: payload });
}

/**
 *
 * @param {Function} dispatch - Action to be ejecuted.
 * @returns {object} - Object with specific Scholar function.
 */
export default function ScholarActionFactory(dispatch) {
	return {
		onGetScholarById: (payload) => onGetScholarById(dispatch, payload),
		setLoading: (payload) => setLoading(payload, dispatch),
		onError: (payload) => errorAction(payload, dispatch),
	};
}
