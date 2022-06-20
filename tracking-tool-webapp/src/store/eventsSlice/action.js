import apiStatus from 'api/models/status';
import apiEvents from 'api/models/events';
import programVersionsAPI from 'api/models/programVersions';
import apiChangeStatus from 'api/models/changeStatus';
import apiEventType from 'api/models/eventType';
import apiScholar from 'api/models/scholars';
import apiUsers from 'api/models/users';
import notificationsAPI from 'api/models/notifications';
import attachmentsApi from 'api/models/attachments';
import locale from 'pages/dashboard/components/eventsManager/locale/en.json';
import locale_app from 'application/context/locale/en.json';
import LoggerService from 'services/LoggerService';
import { EventsActionTypes, StatusActionTypes } from './types';
import { decodeToken } from 'helpers/tokenDecoder';
import { showSuccessToast } from 'helpers/toast';

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function loadEventsErrorFailed(payload) {
	return { type: EventsActionTypes.Error, payload };
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function setloading(payload) {
	return { type: EventsActionTypes.loadingEvents, payload };
}

/**
 *
 * @param {object} payload - payload
 * @returns {Promise<void>}
 */
export function loadStatusFailed(payload) {
	return {
		type: StatusActionTypes.Error,
		payload,
	};
}

/**
 * @param {string} payload - Scholar GUID Id.
 * @returns {Promise<void>}
 */
export function onGetEvents(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiEvents
			.getAllWithParams(payload, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetEvents, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @param {string} payload - params.
 * @returns {Promise<void>}
 */
export function onSearchEvent(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiEvents
			.getAllWithParams(payload, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetEvents, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @param {object} payload - Event object to be updated.
 * @returns {Promise<void>}
 */
export function onPutEvent(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const decodedToken = decodeToken();
		payload.userId = decodedToken.sub;
		apiEvents
			.put(payload, token)
			.then((response) => {
				showSuccessToast({
					title: locale.updateSuccess,
				});
				onGetEvents(dispatch, response.data.scholarId);
				onPopView(dispatch);
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			});
	};
}

/**
 * @param {object} payload - Event object to be created.
 * @returns {Promise<void>}
 */
export function onPostEvent(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const decodedToken = decodeToken();
		payload.userId = decodedToken.sub;
		apiEvents
			.post(payload, token)
			.then((response) => {
				showSuccessToast({
					title: locale.createSuccess,
				});
				onGetEvents(dispatch, response.data.scholarId);
				onPopView(dispatch);
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			});
	};
}

/**
 * @param {object} payload - Update Scholar Status.
 * @returns {Promise<void>}
 */
export function onUpdateChangeStatus(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const decodedToken = decodeToken();
		payload.userId = decodedToken.sub;
		apiChangeStatus
			.post(payload, token)
			.then((response) => {
				showSuccessToast({
					title: locale.updateSuccess,
				});
				onGetEvents(dispatch, response.data.scholarId);
				onPopView(dispatch);
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			});
	};
}

/**
 * @param {object} payload - Event object that is selected.
 * @returns {Promise<void>}
 */
export function onSelectEvent(payload) {
	return { type: EventsActionTypes.onSelectEvent, payload: payload };
}

/**
 * @param {object} payload - selected scholar.
 * @returns {Promise<void>}
 */
export function onSelectScholar(payload) {
	return {
		type: EventsActionTypes.onSelectScholar,
		payload: payload,
	};
}

/**
 * @param {object} payload - view to be render.
 * @returns {Promise<void>}
 */
export function onAddView(payload) {
	return {
		type: EventsActionTypes.onAddView,
		payload: payload,
	};
}

/**
 *
 * @param {object} payload - list of users selected to notify.
 * @returns {Promise<void>}
 */
export function onSelectUsersToNotify(payload) {
	return { type: EventsActionTypes.onSelectUsersToNotify, payload };
}

/**
 * @param {Function} dispatch - Function to remove last view.
 */
export function onPopView(dispatch) {
	dispatch({ type: EventsActionTypes.onPopView });
}

/**
 * @param {Function} dispatch - Function to remove last view.
 */
export function onClearViewStack(dispatch) {
	dispatch({ type: EventsActionTypes.onClearViewStack });
}

/**
 * @returns {Promise<void>}
 */
export function onGetEventTypes() {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiEventType
			.getAll(token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetEventTypes, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @returns {Promise<void>}
 */
export function onGetSubjects() {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiEventType
			.getAll(token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetSubjects, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @returns {Promise<void>}
 */
export function onGetAuthors() {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiUsers
			.getAll(token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetAuthors, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @returns {Promise<void>}
 */
export function onGetStatus() {
	return (dispatch) => {
		dispatch({ type: StatusActionTypes.loadingStatus, payload: true });
		const token = localStorage.getItem('token');
		apiStatus
			.getAll(token)
			.then((response) => {
				dispatch({ type: StatusActionTypes.onGetStatus, payload: response });
			})
			.catch((err) => {
				dispatch(loadStatusFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch({ type: StatusActionTypes.loadingStatus, payload: false });
			});
	};
}

/**
 * @param {string} payload - Program Version GUID Id.
 * @returns {Promise<void>}
 */
export function onGetStages(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const route = `${payload}/stages`;
		const token = localStorage.getItem('token');
		programVersionsAPI
			.getSingle(route, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetStages, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 *
 * @param {object} payload - attachment information.
 * @returns {*} -
 */
export function onUploadEventAttachments(payload) {
	const complementURL = 'upload-one';
	const token = localStorage.getItem('token');
	return attachmentsApi.upload(null, payload, token, complementURL);
}

/**
 * @param {string} payload - Scholar GUID Id.
 * @returns {Promise<void>}
 */
export function onGetCurrentStage(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const route = `${payload}/stages/current`;
		const token = localStorage.getItem('token');
		apiScholar
			.getSingle(route, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onSelectEvent, payload: response.data });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 * @param {object} payload - Event information.
 * @returns {Promise<void>}
 */
export function onGetAttachments(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		const route = `event/${payload.id}`;
		attachmentsApi
			.getSingle(route, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetAttachments, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 *
 * @param {object} payload - Event and attachment ids.
 * @returns {Promise<void>}
 */
export function onDeleteAttachment(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		const route = `event/${payload.event.id}/attachment/${payload.attachment.id}`;
		attachmentsApi
			.deleteSingle(route, token)
			.then(() => {
				dispatch({ type: EventsActionTypes.onDeleteAttachment, payload });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}

/**
 *
 * @param {object} payload - params to search and get users to notify.
 * @returns {Promise<void>}
 */
export function onGetUsersToNotify(payload) {
	return (dispatch) => {
		dispatch(setloading(true));
		const token = localStorage.getItem('token');
		apiUsers
			.getAllWithParams(payload, token)
			.then((response) => {
				dispatch({ type: EventsActionTypes.onGetUsersToNotify, payload: response });
			})
			.catch((err) => {
				dispatch(loadEventsErrorFailed(err.message));
				LoggerService.error(err);
			})
			.finally(() => {
				dispatch(setloading(false));
			});
	};
}
/**
 *
 * @param {object} payload - Array of notifications to send.
 * @returns {Promise<void>}
 */
export function onSendNotifications(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const complementUrl = 'notify';
		notificationsAPI
			.post(payload, token, complementUrl)
			.then((response) => {
				LoggerService.info(response.message);
			})
			.catch((error) => {
				dispatch(loadEventsErrorFailed(error.message));
				LoggerService.error(error);
			});
	};
}
/**
 *
 * @param {object} payload - Array of email to send.
 * @returns {Promise<void>}
 */
export function onSendEmails(payload) {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const complementUrl = 'email';
		notificationsAPI
			.post(payload, token, complementUrl)
			.then((response) => {
				showSuccessToast({
					title: locale_app.verifyEmail.emailSent,
				});
			})
			.catch((error) => {
				dispatch(loadEventsErrorFailed(error.message));
				LoggerService.error(error);
			});
	};
}
