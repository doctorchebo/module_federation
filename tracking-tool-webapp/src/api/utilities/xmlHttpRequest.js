/* eslint-disable jsdoc/require-returns-check */
import { POST, STATUS_MULTIPLE_CHOICES, HTTP_READY, STATUS_OK } from 'helpers/constants';
import ApiSettings from 'settings/settings';

const settings = ApiSettings(process.env.REACT_APP_NODE_ENV);
const HEADERS = {
	encType: 'enc-type',
	multipart: 'multipart/form-data',
};

/**
 *
 * @param {string} url - url to connect
 * @param {string} service - name of service
 * @param {object} information - data
 * @param {string} token - token to authorization
 * @param {string} method - type of rest method
 * @returns {Promise} -
 */
export default function xmlHttpRequestWithProgress(
	url,
	service,
	information,
	token = '',
	method = POST
) {
	// TODO: add token
	const { data, onProgress } = information;
	const formData = data ? data : new FormData();
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.upload.onprogress = (event) => {
			runProgressEvent(event)(onProgress);
		};
		xhr.onreadystatechange = (event) => {
			readyStateChange(xhr, resolve, reject);
		};
		xhr.onerror = () => {
			reject(Error('InternalServerError'));
		};
		xhr.open(method, settings[service].API_URL + url);
		xhr.setRequestHeader(HEADERS.encType, HEADERS.multipart);
		xhr.send(formData);
	});
}

/**
 *
 * @param {Event} event - xmlHttpRequest progress event
 * @returns {Function} - response
 */
function runProgressEvent(event) {
	const { loaded, total } = event;
	return function (progress) {
		total === 0 ? progress(0) : progress(parseInt((loaded * 100) / total));
	};
}

/**
 *
 * @param {object} xhr - xmlHttpRequest object
 * @param {*} resolve - resolve promise
 * @param {*} reject - reject promise
 * @returns {*} response
 */
function readyStateChange(xhr, resolve, reject) {
	if (xhr.readyState !== HTTP_READY) {
		return;
	}
	if (xhr.status >= STATUS_OK && xhr.status < STATUS_MULTIPLE_CHOICES) {
		const data = JSON.parse(xhr.response);
		resolve(data);
	} else {
		const errors = JSON.parse(xhr.response);
		reject(errors);
	}
}
