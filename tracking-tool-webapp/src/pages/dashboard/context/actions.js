import { DashBoardActions } from './enums';

/**
 *
 * @param {Array} payload -
 * @param {Function} dispatch -
 */
function errorAction(payload, dispatch) {
	dispatch({ type: DashBoardActions.Error, payload: payload });
}

/**
 *
 * @param {Function} dispatch - function to change state of onImporting.
 * @param {boolean} payload - activate or deactivate sidebar.
 */
function onImporting(dispatch, payload) {
	dispatch({ type: DashBoardActions.OnImporting, payload });
}

/**
 *
 * @param {Function} dispatch - function to change state of onImporting.
 * @param {boolean} payload - activate or deactivate sidebar.
 */
function onDimmed(dispatch, payload) {
	dispatch({ type: DashBoardActions.OnDimmed, payload });
}

/**
 * Add reports to state
 *
 * @param {Promise} payload -
 * @param {Function} dispatch -
 */
function addReports(payload, dispatch) {
	dispatch({ type: DashBoardActions.Loading, payload: true });
	payload
		.then((response) => {
			dispatch({ type: DashBoardActions.OnReports, payload: response });
		})
		.catch((err) => {
			errorAction(err.message, dispatch);
		})
		.finally(() => dispatch({ type: DashBoardActions.Loading, payload: false }));
}

/**
 * Set loading on true or false
 *
 * @param {Function} payload -
 * @param {Function} dispatch -
 */
function setLoading(payload, dispatch) {
	dispatch({ type: DashBoardActions.Loading, payload: payload });
}

/**
 * Removes report
 *
 * @param {Function} dispatch -
 */
function removeReports(dispatch) {
	dispatch({ type: DashBoardActions.OnReports, payload: null });
}

/**
 * Changes the content in sidebar depending the context of importation
 *
 * @param {Function} payload -
 * @param {Function} dispatch -
 */
function setImportContent(payload, dispatch) {
	dispatch({ type: DashBoardActions.SetImportContent, payload: payload });
}

/**
 *
 * @param {Function} dispatch - Action to be ejecuted.
 * @returns {object} - Object with specific dashboard function.
 */
export default function DashboardActionFactory(dispatch) {
	return {
		onImporting: (payload) => onImporting(dispatch, payload),
		onDimmed: (payload) => onDimmed(dispatch, payload),
		onAddReports: (payload) => addReports(payload, dispatch),
		setImportContent: (payload) => setImportContent(payload, dispatch),
		setLoading: (payload) => setLoading(payload, dispatch),
		onRemoveReports: () => removeReports(dispatch),
		onError: (payload) => errorAction(payload, dispatch),
	};
}
