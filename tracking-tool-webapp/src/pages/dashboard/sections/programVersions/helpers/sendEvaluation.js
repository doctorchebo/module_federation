import programVersionsAPI from 'api/models/programVersions';
import locale from '../locale/en.json';
import LoggerService from 'services/LoggerService';
import { showSuccessToast, showWarningToast, showErrorToast } from 'helpers/toast';

/**
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {string} payload - Program Version Guid Id.
 * @param {object} ProgramVersionsActionTypes - Action list of program version
 */
export function OnSendEvaluationReports(dispatch, payload, ProgramVersionsActionTypes) {
	dispatch({ type: ProgramVersionsActionTypes.loading, payload: true });
	const route = `${payload}/scholars`;
	const token = localStorage.getItem('token');
	programVersionsAPI
		.getSingle(route, token)
		.then((response) => {
			const notification = {
				time: 0,
				size: 'large',
				list: response.data.map((report) => report.scholar.person.fullName),
			};

			if (response.data.some((report) => report.evaluation)) {
				showSuccessToast({
					title: locale.reportSuccess.title,
					description: locale.reportSuccess.description,
					...notification,
				});
			} else {
				showWarningToast({
					title: locale.reportFail.title,
					description: locale.reportFail.description,
					...notification,
				});
			}
		})
		.catch((error) => {
			showErrorToast({
				title: locale.reportError.title,
				list: locale.reportError.list,
				time: 0,
				size: 'large',
			});
			dispatch({ type: ProgramVersionsActionTypes.Error, payload: error.message });
			LoggerService.error(error);
		})
		.finally(() => {
			dispatch({ type: ProgramVersionsActionTypes.loading, payload: false });
		});
}
