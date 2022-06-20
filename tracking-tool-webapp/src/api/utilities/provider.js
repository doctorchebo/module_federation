import request from './fetch.js';
import { HEADER_JSON, PATCH, POST, PUT, DELETE } from '../../helpers/constants';
import { isEmpty } from 'helpers/validators';

/**
 * Sends a GET request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {string} service - Service's name
 * @param {string} complementUrl - Optional complement to url
 * @param {string} token - Identifier of resource
 * @returns {object} response
 */
async function getAll(resource, service, complementUrl = '', token = '') {
	if (!isEmpty(complementUrl)) {
		resource = `${resource}/${complementUrl}`;
	}
	return await request(resource, {}, service, token);
}

/**
 * Sends a GET request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} params - Optional. A object to send as a query string.
 * @param {string} service - Service's name
 * @param {string} complementUrl - Optional complement to url
 * @param {string} token - Identifier of resource
 * @returns {object} response
 */
async function getAllWithParams(resource, params, service, complementUrl = '', token = '') {
	if (!isEmpty(complementUrl)) {
		resource = `${resource}/${complementUrl}`;
	}
	return await request(resource, params, service, token);
}

/**
 * Sends a GET request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {number} id - Identifier of resource
 * @param {string} service - Service's name
 * @param {string} token - Identifier of resource
 * @returns {object} response
 */
async function getSingle(resource, id, service, token = '') {
	return await request(`${resource}/${id}`, {}, service, token);
}

/**
 * Sends a POST request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} params - Optional. A object to send as a body.
 * @param {string} service - Service's name
 * @param {string} complementUrl - Optional complement to url
 * @param {string} token - Identifier of resource
 * @param {object} options - options of the request
 * @returns {object} response
 */
async function post(
	resource,
	params,
	service,
	complementUrl = '',
	token = '',
	options = { headers: { 'Content-Type': HEADER_JSON } }
) {
	if (!isEmpty(complementUrl)) {
		resource = `${resource}/${complementUrl}`;
	}
	return await request(resource, params, service, token, { ...options, method: POST });
}

/**
 * Sends a PUT request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} params - Optional. A object to send as a body.
 * @param {string} service - Service's name
 * @param {string} complementUrl - Optional complement to url
 * @param {string} token - Identifier of resource
 * @param {object} options - options of the request
 * @returns {object} response
 */
async function put(
	resource,
	params,
	service,
	complementUrl = '',
	token = '',
	options = { headers: { 'Content-Type': HEADER_JSON } }
) {
	if (!isEmpty(complementUrl)) {
		resource = `${resource}/${complementUrl}`;
	}
	return await request(`${resource}`, params, service, token, { ...options, method: PUT });
}

/**
 * Sends a PATCH request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {object} params - Optional. A object to send as a body.
 * @param {string} service - Service's name
 * @param {string} complementUrl - Optional complement to url
 * @param {string} token - Identifier of resource
 * @param {object} options - options of the request
 * @returns {object} response
 */
async function patch(
	resource,
	params,
	service,
	complementUrl = '',
	token = '',
	options = { headers: { 'Content-Type': HEADER_JSON } }
) {
	if (!isEmpty(complementUrl)) {
		resource = `${resource}/${complementUrl}`;
	}
	return await request(`/${resource}`, params, service, token, { ...options, method: PATCH });
}

/**
 * Sends a DELETE request to the specified url
 *
 * @param {string} resource - url of the request
 * @param {number} id - Identifier of resource
 * @param {string} service - Service's name
 * @param {string} token - Identifier of resource
 * @returns {object} response
 */
async function deleteSingle(resource, id, service, token = '') {
	return await request(`${resource}/${id}`, {}, service, token, { method: DELETE });
}

export const apiProvider = {
	getAll,
	getAllWithParams,
	getSingle,
	post,
	put,
	patch,
	deleteSingle,
};
