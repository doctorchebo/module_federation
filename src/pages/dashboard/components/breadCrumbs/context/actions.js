import { BreadcrumbsActionTypes } from './enums';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {Function} payload - Function to change context state.
 */
function onBreadcrumbsLoad(dispatch, payload) {
	dispatch({
		type: BreadcrumbsActionTypes.load,
		payload: payload,
	});
}

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @returns {object} - actions
 */
export default function BreadcrumbsActionFactory(dispatch) {
	return {
		onBreadcrumbsLoad: (payload) => onBreadcrumbsLoad(dispatch, payload),
	};
}
