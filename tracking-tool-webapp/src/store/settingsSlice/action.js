import apiGrade from 'api/models/grade';
import orderGrades from 'pages/dashboard/sections/settings/helpers/orderGrade';
import { SettingsActions } from './types';
import { showErrorToast, showSuccessToast } from 'helpers/toast';
import LoggerService from 'services/LoggerService';
import locale from 'pages/dashboard/sections/settings/locale/en.json';
/**
 * @returns {Promise<void>} - Returns a Promise a set the all grades
 */
export function onLoadGrades() {
	return (dispatch) => {
		dispatch(loadingAction(true));
		const token = localStorage.getItem('token');
		const complement = 'subjectevaluation';
		apiGrade
			.getAll(token, complement)
			.then((response) => {
				dispatch(getGradesAction(orderGrades(response)));
			})
			.catch((err) => {
				LoggerService.error(err);
				errorAction(err, dispatch);
			})
			.finally(() => {
				dispatch(loadingAction(false));
			});
	};
}

/**
 * @param {object} payload - Get the grade in an Array
 * @returns {Promise<void>} - returns a Promise with the grades updated
 */
export function onUpdateGrades(payload) {
	return (dispatch) => {
		dispatch(loadingAction(true));
		const token = localStorage.getItem('token');
		apiGrade
			.put(payload, token, 'update')
			.then((response) => {
				dispatch(getGradesAction(orderGrades(response.data)));
				dispatch(updateGradeAction(true));
				showSuccessToast({
					title: locale.gradeSettings.updateSuccess,
				});
			})
			.catch((err) => {
				dispatch(errorAction(err.message));
				showErrorToast({
					title: locale.gradeSettings.updateError,
				});
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(loadingAction(false));
			});
	};
}

/**
 * @param {object} payload - Get the error message
 * @returns {Promise<void>} - set the status of the error
 */
export function errorAction(payload) {
	return { type: SettingsActions.Error, payload: payload };
}

/**
 * @param {object} payload - Set the loading status
 * @returns {Promise<void>}
 */
export function loadingAction(payload) {
	return {
		type: SettingsActions.Loading,
		payload: payload,
	};
}

/**
 * @param {object} payload - Get the grades in an Array
 * @returns {Promise<void>}
 */
export function getGradesAction(payload) {
	return {
		type: SettingsActions.OnGetGrades,
		payload: payload,
	};
}

/**
 * @param {object} payload - Set status of the update
 * @returns {Promise<void>}
 */
export function updateGradeAction(payload) {
	return {
		type: SettingsActions.OnUpdateGrades,
		payload: payload,
	};
}
