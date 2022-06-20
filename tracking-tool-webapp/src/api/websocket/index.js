import { enumServices } from 'api/utilities/enumServices';
import { decodeToken } from 'helpers/tokenDecoder';
import ApiSettings from 'settings/settings';
/**
 * Returns an object the contains the url and topic used to work with SockJsClient
 *
 * @returns {object} Object that contains the url and topic
 */
export function getWebSocketValues() {
	const settings = ApiSettings(process.env.REACT_APP_NODE_ENV);
	const service = enumServices.Notifications;
	const urlNotifications = 'notifications';

	const decodedToken = decodeToken();
	let userId = '';
	if (decodedToken) {
		userId = decodedToken.sub;
	}

	const url = `${settings[service].URL}/${urlNotifications}`;
	const topic = `/user/${userId}/queue/notification`;

	return { url, topic };
}
