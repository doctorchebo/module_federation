import { useState } from 'react';
import { isEmpty } from 'helpers/validators';
import { FormGroup } from './models';

/**
 * This hook works with forms.
 *
 * @param {FormGroup} formGroup - This is an object of FormGroup.
 * @returns {any} - Returns an object with some attributes.
 */
export default function useForm(formGroup) {
	if (!(formGroup instanceof FormGroup)) {
		throw Error('The initial state should be an instance of FormGroup');
	}
	const [form, setForm] = useState(formGroup);
	const fieldControl = (changeEvent, getFormGroup = (form) => form) => {
		const { name, value } = changeEvent.target;
		if (isEmpty(name)) {
			throw Error(`'${name}' attribute don't found into label`);
		}
		const abstractControl = getFormGroup(form);
		const control = abstractControl.getControl(name);
		control.setValue(value);
		control.dirty = true;
		setForm(new FormGroup(form.controls, form.abstractControlOptions));
	};
	const handleSubmit = (func) => {
		return (submitEvent) => {
			submitEvent.preventDefault();
			func(form.value);
		};
	};
	return {
		...form,
		isValid: () => form.isValid,
		handleSubmit,
		fieldControl,
	};
}
