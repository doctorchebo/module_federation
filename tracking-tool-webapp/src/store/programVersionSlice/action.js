import programVersionsAPI from 'api/models/programVersions';
import { programVersionsActionTypes } from './types';
import locale from 'pages/dashboard/sections/programVersions/locale/en.json';
import LoggerService from 'services/LoggerService';
import { showSuccessToast, showErrorToast } from 'helpers/toast';
import { decodeToken } from 'helpers/tokenDecoder';

/**
 * @param {object} payload - Program Version Guid Id.
 * @returns {Promise<void>} - Test.
 */
export function onSendSubjectEvaluationReports(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		const decodedToken = decodeToken();
		const coordinatorId = decodedToken.sub;
		const token = localStorage.getItem('token');

		const route = `${payload}/subjectevaluations/${coordinatorId}`;
		programVersionsAPI
			.getSingle(route, token)
			.then((response) => {
				const notification = {
					size: 'large',
					list: response.data.map((report) => report.scholar.scholarName),
				};

				if (response.data.some((report) => report.subjects)) {
					showSuccessToast({
						title: locale.reportSuccess.title,
						description: locale.reportSuccess.description,
						...notification,
					});
				}
			})
			.catch((error) => {
				showErrorToast({
					title: locale.reportSubjectError.title,
					list: locale.reportSubjectError.list,
					time: 0,
					size: 'large',
				});
				dispatch(loadErrorAction(error.message));
				LoggerService.error(error);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};
}

/**
 * @param {object} payload -
 * @returns {Promise<void>}
 */
export function setLoading(payload) {
	return {
		type: programVersionsActionTypes.loading,
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
		type: programVersionsActionTypes.error,
		payload,
	};
}
