import { isEmpty } from 'helpers/validators';
import { FormControl } from '../../models';

/**
 * This function is a validator to FormControl instance.
 *
 * @param {number} number This is any positive number.
 * @param {boolean|any} error This error will save in case that exist an error.
 * @returns {Function} Returns a function.
 */
export function maxLengthValidator(number, error = true) {
	if (isNaN(number) || number <= 0 || isEmpty(error)) {
		throw new Error('Invalid params');
	}
	/**
	 * @param {FormControl} control This is an instance of FormControl.
	 * @returns {Error|null} Returns an error if the expression is correct, otherwise returns null.
	 */
	return (control) => (control.value?.length <= number ? null : { maxLenght: error });
}
