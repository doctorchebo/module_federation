import { isEmpty } from 'helpers/validators';
import { FormControl } from '../../models';

/**
 * This function is a validator to FormControl instance.
 *
 * @param {RegExp} patternRegexp This is any regular expression.
 * @param {boolean|Error} error This error will save in case that exist an error.
 * @returns {Function} Returns a function.
 */
export function patternValidator(patternRegexp, error = true) {
	if (isEmpty(error)) {
		throw new Error('Invalid params');
	}
	/**
	 * @param {FormControl} control This is an instance of FormControl.
	 * @returns {Error|null} Returns an error if the expression is correct, otherwise returns null.
	 */
	return (control) => (patternRegexp.test(control.value) ? null : { pattern: error });
}
