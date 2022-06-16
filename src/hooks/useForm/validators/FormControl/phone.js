import { validatePhoneNumber } from 'helpers/inputValidators';

/**
 * Checks if the value of an phone number input is valid.
 * This function is a validator to FormControl instance.
 *
 * @param {boolean|Error} error This error will save in case that exist an error.
 * @returns {Function} Returns a function.
 */
export function phoneNumberValidator(error = true) {
	return (control) => (validatePhoneNumber(control.value) ? false : { phoneNumber: error });
}
