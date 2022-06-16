import { FormGroup } from '../../models';

/**
 * This function is a valitator of fields to FormBuilder.
 *
 * @param {any} error This is the error to handler validators.
 * @param {string[]} fields These are fields of FormControl.
 * @returns {Function} Returns a function.
 */
export function sameValuesValidator(error = true, ...fields) {
	/**
	 *
	 * @param {FormGroup} formGroup This is an instance of FormGroup.
	 * @returns {any} Returns an error if the expression is correct, otherwise returns null.
	 */
	return function sameValues(formGroup) {
		const [first, ...others] = fields;
		const firstControl = formGroup.getControl(first);
		return others.every((other) => {
			const otherControl = formGroup.getControl(other);
			const isValid = firstControl.value === otherControl.value;
			otherControl.setErrors({ sameFields: isValid ? null : error });
			return isValid;
		});
	};
}
