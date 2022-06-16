/**
 * Validates emails, following formas are being supported:
 *
 * @example one.two@test.com
 * @example 123.456@test.com
 * @example 123.456@test - .something is required
 * @example 123.456@test.some-thing - No special characters in the last part
 * @example #$%$.@t!@#!@ - special caracters
 * @example 123.456@test@test2.com - Just one @
 * @param {string} email -
 * @returns {string} -
 */
export function validateEmail(email) {
	let error;

	const re =
		// eslint-disable-next-line max-len
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!re.test(String(email).toLowerCase())) {
		error = 'Email format incorrect';
	}

	return error;
}

/**
 * @param {*} errors -
 * @returns {*} -
 */
export function isErrors(errors) {
	const error =
		(errors.name && Object.entries(errors.name).length) ||
		(errors.lastname && Object.entries(errors.lastname).length) ||
		(errors.username && Object.entries(errors.username).length) ||
		(errors.email && Object.entries(errors.email).length) ||
		(errors.email && Object.entries(errors.email).length);
	return error;
}

/**
 * @param {*} errors -
 * @returns {*} -
 */
export function isErrorsSignIn(errors) {
	const error = errors.username && Object.entries(errors.username).length;
	return error;
}
