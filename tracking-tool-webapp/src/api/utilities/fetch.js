import {
	CONNECT_AND,
	CONNECT_EQUAL,
	CONNECT_PARAMS,
	GET,
	HEADER_JSON,
	STATUS_OK,
	STATUS_BAD_REQUEST,
} from 'helpers/constants';
import { errors } from 'exceptions/errors';
import InternalServerError from 'exceptions/InternalServerError';
import BadRequest from 'exceptions/BadRequest';
import LoggerService from 'services/LoggerService';
import ApiSettings from 'settings/settings';

const settings = ApiSettings(process.env.REACT_APP_NODE_ENV);

/**
 * Provides an easy, logical way to fetch resources asynchronously across the network.
 *
 * @param {string} url - url to connect
 * @param {object} params - params to body or query params
 * @param {string} service - name of service
 * @param {string} token - token to authorization
 * @param {object} options - options of the request
 * @returns {object} response
 */
async function request(url, params, service, token = '', options = { method: GET, headers: {} }) {
	const headers = { ...options.headers, Authorization: `Bearer ${token}` };

	if (params) {
		if (options.method === GET) {
			url += CONNECT_PARAMS + objectToQueryString(params);
		} else {
			options.body =
				headers['Content-Type'] !== HEADER_JSON ? params : JSON.stringify(params);
		}
	}
	let response;
	try {
		response = await fetch(settings[service].API_URL + url, { ...options, headers });
		console.log('The fetched url is : => ' + settings[service].API_URL);
	} catch (err) {
		throw new InternalServerError(err.message);
	}
	const status = response.status;
	if (status !== STATUS_OK) {
		const clientError = errors[status];
		LoggerService.error(`${status}`);
		if (status === STATUS_BAD_REQUEST) {
			const { error } = await response.json();
			throw new BadRequest(error);
		}

		throw new clientError();
	}
	return await response.json();
}

/**
 * Transform a object to query params
 *
 * @param {object} obj - object to convert
 * @returns {string} query params
 */
function objectToQueryString(obj) {
	return Object.keys(obj)
		.map((key) => key + CONNECT_EQUAL + obj[key])
		.join(CONNECT_AND);
}

export default request;
