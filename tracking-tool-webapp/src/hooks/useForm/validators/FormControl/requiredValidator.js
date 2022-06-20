import { FormControl } from '../../models';
import { isEmpty } from 'helpers/validators';

/**
 * This function is a validator to FormControl instance.
 *
 * @param {boolean|Error} error This error will save in case that exist an error.
 * @returns {Function} Returns a function.
 */
export function requiredValidator(error = true) {
	if (isEmpty(error)) {
		throw new Error('Invalid params');
	}
	/**
	 * @param {FormControl} control This is an instance of FormControl.
	 * @returns {Error|null} Returns an error if the expression is correct, otherwise returns null.
	 */
	return (control) => (isEmpty(control.value) ? { required: error } : null);
}
