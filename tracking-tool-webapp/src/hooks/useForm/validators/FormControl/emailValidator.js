import { validateEmail } from 'helpers/inputValidators';
import { isEmpty } from 'helpers/validators';

/**
 * This function is a validator to FormControl instance.
 *
 * @param {boolean|Error} error This error will save in case that exist an error.
 * @returns {Function} Returns a function.
 */
export function emailValidator(error = true) {
	if (isEmpty(error)) {
		throw new Error('Invalid params');
	}

	/**
	 * @param {string} control email to validate
	 * @returns {Error|null} Returns an error if the expression is correct, otherwise returns null.
	 */
	//TODO: search the best way to refactor the validateEmail
	return (control) =>
		validateEmail(control.value) ? { required: validateEmail(control.value) } : null;
}
