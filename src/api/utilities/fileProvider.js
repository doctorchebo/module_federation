import { POST } from '../../helpers/constants';
import xmlHttpRequestWithProgress from './xmlHttpRequest';

/**
 *
 * @param {string} resource - url of the request
 * @param {object} params - optional request params
 * @param {string} service - service name
 * @param {object} information - information for the request
 * @param {string} complementUrl - optional complement to url
 * @param {string} token - Identifier of resource
 * @returns {object} response
 */
async function upload(resource, params, service, information, complementUrl = '', token = '') {
	if (complementUrl) {
		resource = `${resource}/${complementUrl}`;
	}
	return await xmlHttpRequestWithProgress(`/${resource}`, service, information, token, POST);
}

export const fileProvider = {
	upload,
};
