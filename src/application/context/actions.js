import userIdentityAPI from 'api/models/userIdentity';
import userAuthenticationAPI from 'api/models/userAuthentication';
import { ApplicationActions, languages } from '../enums';
import LoggerService from 'services/LoggerService';
import englishMessages from 'application/languages/en-US.json';
import spanishMessages from 'application/languages/es-BO.json';
import notificationsAPI from 'api/models/notifications';
import { decodeToken } from 'helpers/tokenDecoder';
import { showErrorToast, showSuccessToast } from 'helpers/toast';
import locale from './locale/en.json';

/**
 *
 * @param {Array} payload -
 * @param {Function} dispatch -
 */
function ErrorAction(payload, dispatch) {
	dispatch({ type: ApplicationActions.Error, payload: payload });
}

/**
 *
 * @param {string} payload - language.
 * @param {Function} dispatch -
 */
function ChangeIdiom(payload, dispatch) {
	switch (payload) {
		case languages.spanish:
			dispatch({
				type: ApplicationActions.Idiom,
				payload: {
					locale: languages.spanish,
					messages: spanishMessages,
				},
			});
			break;
		case languages.english:
			dispatch({
				type: ApplicationActions.Idiom,
				payload: {
					locale: languages.english,
					messages: englishMessages,
				},
			});
			break;
	}
}

/**
 *
 * @param {object} payload -
 * @param {Function} dispatch -
 */
function SignIn(payload, dispatch) {
	dispatch({ type: ApplicationActions.LoadSignIn, payload: true });
	const complement = 'login';
	userAuthenticationAPI
		.post(payload, '', complement)
		.then((response) => {
			const token = response.data[0];
			const complement = 'profile';
			LoggerService.info('Signin successful');
			localStorage.setItem('token', token);
			return userIdentityAPI.getAllWithParams('', token, complement);
		})
		.then((response) => {
			const profile = response.data;
			dispatch({ type: ApplicationActions.SignIn, payload: true });
			dispatch({ type: ApplicationActions.Profile, payload: profile });
			dispatch({ type: ApplicationActions.Role, payload: profile.roles[0].name });
		})
		.catch((err) => {
			LoggerService.error(err.message);
			ErrorAction(err.message, dispatch);
		})
		.finally(() => {
			dispatch({ type: ApplicationActions.LoadSignIn, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch -
 */
function Profile(dispatch) {
	const token = localStorage.getItem('token');
	const complement = 'profile';
	userIdentityAPI
		.getAllWithParams('', token, complement)
		.then((response) => {
			const profile = response.data;
			dispatch({ type: ApplicationActions.Profile, payload: profile });
			dispatch({ type: ApplicationActions.Role, payload: profile.roles[0].name });
		})
		.catch((err) => {
			LoggerService.error(err.message);
			ErrorAction(err.message, dispatch);
		});
}

/**
 *
 * @param {Function} dispatch -
 */
function Dashboard(dispatch) {
	const token = localStorage.getItem('token');
	const complement = 'profile';
	dispatch({ type: ApplicationActions.Loading, payload: true });
	userIdentityAPI
		.getAllWithParams('', token, complement)
		.then((response) => {
			const profile = response.data;
			dispatch({ type: ApplicationActions.Profile, payload: profile });
			dispatch({ type: ApplicationActions.Role, payload: profile.roles[0].name });
			dispatch({ type: ApplicationActions.SignIn, payload: !!profile });
		})
		.catch((err) => {
			LoggerService.error(err.message);
			ErrorAction(err.message, dispatch);
			dispatch({ type: ApplicationActions.SignIn, payload: false });
			dispatch({ type: ApplicationActions.Role, payload: '' });
			localStorage.removeItem('token');
		})
		.finally(() => {
			dispatch({ type: ApplicationActions.Loading, payload: false });
		});
}

/**
 *
 * @param {Function} dispatch -
 */
function SessionRestore(dispatch) {
	Dashboard(dispatch);
}

/**
 *
 * @param {Function} dispatch -
 */
function Logout(dispatch) {
	const complement = 'logout';
	const token = localStorage.getItem('token');
	userAuthenticationAPI
		.post(null, token, complement)
		.then(() => {
			LoggerService.info('Logout successfully');
		})
		.catch((err) => {
			LoggerService.error(err.message);
			ErrorAction(err.message, dispatch);
		})
		.finally(() => {
			localStorage.removeItem('token');
			dispatch({ type: ApplicationActions.Logout, payload: false });
		});
}

/**
 * Add new view to Right Sidebar
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - view to be render.
 */
function addViewToSidebar(dispatch, payload) {
	dispatch({ type: ApplicationActions.onSidebarAdd, payload: payload });
}

/**
 * Remove the current view on Right Sidebar
 *
 * @param {Function} dispatch - Function to change context state.
 */
function removeViewFromSidebar(dispatch) {
	dispatch({ type: ApplicationActions.onSidebarRemove });
}

/**
 * To hide RightSidebar component
 *
 * @param {Function} dispatch - Function to change context state.
 */
function hideSidebar(dispatch) {
	dispatch({
		type: ApplicationActions.onSidebarClear,
	});
}

/**
 * Share information on the application state
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {object} payload - information to share
 */
function shareInformation(dispatch, payload) {
	dispatch({
		type: ApplicationActions.onShareUpdate,
		payload,
	});
}

/**
 * Updates notification list
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {Array} payload - updated notification list
 */
function onNotificationsLoad(dispatch, payload) {
	dispatch({ type: ApplicationActions.onNotificationUpdate, payload });
	const token = localStorage.getItem('token');
	const decodedToken = decodeToken();
	const userId = decodedToken.sub;
	const complementUrl = `user/${userId}`;
	notificationsAPI
		.getAll(token, complementUrl)
		.then((response) => {
			dispatch({ type: ApplicationActions.onLoadNotifications, payload: response });
		})
		.catch((error) => {
			LoggerService.error(error);
			showErrorToast({ description: error.message });
		});
}
/**
 * Updates notification list
 *
 * @param {Function} dispatch - Function to change context state.
 * @param {Array} payload - updated notification list
 */
function onNotificationsUpdate(dispatch, payload) {
	dispatch({ type: ApplicationActions.onNotificationUpdate, payload });
}
/**
 * Verify if a user email exists and obtains a token
 *
 * @param {string} payload - email inserted
 */
function verifyEmail(payload) {
	const complement = 'check-email';
	showSuccessToast({
		title: locale.verifyEmail.verifyingEMail,
	});
	userIdentityAPI
		.getAllWithParams(payload, '', complement)
		.then((response) => {
			sessionStorage.setItem('resetToken', response.token);
			showSuccessToast({
				title: locale.verifyEmail.emailSent,
			});
		})
		.catch((err) => {
			LoggerService.error(err.message);
			showErrorToast({
				title: locale.verifyEmail.error,
			});
		});
}

/**
 * Change a user password validing with the actual token and a secret code
 *
 * @param {object} payload - secret code and the new password
 */
function changeUserPassword(payload) {
	const complement = 'change-password?token=' + sessionStorage.getItem('resetToken');
	userIdentityAPI
		.put(payload, '', complement)
		.then(() => {
			sessionStorage.removeItem('resetToken');
			showSuccessToast({
				title: locale.changePassword.passwordUpdated,
			});
		})
		.catch((err) => {
			LoggerService.error(err.message);
			showErrorToast({
				title: locale.changePassword.error,
			});
		});
}

/**
 *
 * @param {Function} dispatch -
 * @returns {object} - actions
 */
export default function ApplicationActionFactory(dispatch) {
	return {
		onSignIn: (payload) => SignIn(payload, dispatch),
		onLogout: () => Logout(dispatch),
		onProfile: () => Profile(dispatch),
		onDashboard: () => Dashboard(dispatch),
		onSessionRestore: () => SessionRestore(dispatch),
		onError: (payload) => ErrorAction(payload, dispatch),
		onChangeIdiom: (payload) => ChangeIdiom(payload, dispatch),
		/**
		 * It receives a data structure that is used as properties of the right
		 * sidebar, the structure consists of a header, content (component to
		 * render), footer and actions to cancel or confirm the content of the
		 * sidebar.
		 * You can send only the content and the confirmation action that is a
		 * function.
		 *
		 * header, footer and onCancel, are optional to send
		 * content and onSave are recommend to send
		 *
		 * @example
		 * const [store, actions] = useApplication();
		 * actions.onSidebarAddView({
		 * 		header: {},
		 * 		content: <Container>Working</Container>,
		 * 		footer: {},
		 * });
		 * @param {object} payload - data structure to RightSidebar component
		 * @returns {void} change the right sidebar data structure
		 */
		onSidebarAddView: (payload) => addViewToSidebar(dispatch, payload),
		onSidebarPopView: () => removeViewFromSidebar(dispatch),
		onHideSidebar: () => hideSidebar(dispatch),
		onShareInformation: (payload) => shareInformation(dispatch, payload),
		onNotificationsLoad: (payload) => onNotificationsLoad(dispatch, payload),
		onNotificationsUpdate: (payload) => onNotificationsUpdate(dispatch, payload),
		onVerifyEmail: (payload) => verifyEmail(payload),
		onChangeUserPassword: (payload) => changeUserPassword(payload),
	};
}
