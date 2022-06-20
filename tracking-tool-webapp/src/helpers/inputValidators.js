import locale from './locale/en.json';

const passwordLength = 10;
const secretCodeLength = 6;

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
		error = locale.emailValidator.error;
	}

	return error;
}

/**
 * Validates password: validates if a recived password
 *
 * is less than 10 characters
 * contains a lowercase character
 * contains a uppercase character
 * contains a number
 * contains a symbol
 *
 * @param {string} password - recived password
 * @returns {string} - error message
 */
export function validatePassword(password) {
	if (password.length < passwordLength) {
		return locale.passwordValidator.lengthError;
	} else if (!/[a-z]/.test(String(password))) {
		return locale.passwordValidator.lowercase;
	} else if (!/[A-Z]/.test(String(password))) {
		return locale.passwordValidator.uppercase;
	} else if (/^[a-zA-Z0-9]+$/.test(String(password).toLowerCase())) {
		return locale.passwordValidator.symbolError;
	} else if (!/\d/.test(password.trim())) {
		return locale.passwordValidator.number;
	}
}

/**
 * Validates code: validates if the code is less than 6 characters
 *
 * @param {string} code - recived code
 * @returns {string} - message error
 */
export function validateCode(code) {
	let error;

	if (code.length < secretCodeLength) {
		error = locale.codeValidator.error;
	}

	return error;
}

/**
 * Validates a phone number, if cell phone number or a landline valid
 *
 * @param {string} value The phone number to validate
 * @returns {boolean} True or False
 */
export function validatePhoneNumber(value) {
	return /^[6-7]{1}[0-9]{7}$/.test(value) || /^[2-4]{1}[0-9]{6}$/.test(value);
}
