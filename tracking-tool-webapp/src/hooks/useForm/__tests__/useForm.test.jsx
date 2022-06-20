import { act, renderHook } from '@testing-library/react-hooks';
import { FormControl, FormGroup } from '../models';
import useForm from '../useForm';
import { minLengthValidator, patternValidator, requiredValidator } from '../validators';

describe('useForm custom hook', () => {
	test('Should give an error when the custom hook do not have params', () => {
		expect(() => useForm()).toThrowError(
			'The initial state should be an instance of FormGroup'
		);
	});
	test('Should give an error when the custom hook receive a param different to FormGroup', () => {
		expect(() => useForm(new Error())).toThrowError(
			'The initial state should be an instance of FormGroup'
		);
	});
	test('Should be able to work with this hook when are used their properties', () => {
		// Define data
		const firstField = 'firstField';
		const secondField = 'secondField';
		let initialState = new FormGroup({
			[firstField]: new FormControl(
				'firstValue',
				requiredValidator(new Error()),
				patternValidator(/only test/, 'pattern invalid')
			),
			[secondField]: new FormControl(null, requiredValidator(), minLengthValidator(5)),
		});
		// Mount hook
		const form = renderHook(() => useForm(initialState));
		const { controls, isValid, fieldControl, handleSubmit } = form.result.current;
		// Check the values
		expect(controls[firstField].hasErrors()).toBeTruthy();
		expect(controls[secondField].hasErrors()).toBeTruthy();
		expect(isValid()).toBeFalsy();
		// Execute the action
		act(() => {
			fieldControl({ target: { name: firstField, value: 'only test' } });
		});
		// Check the values
		expect(controls[firstField].hasErrors()).toBeFalsy();
		expect(controls[secondField].hasErrors()).toBeTruthy();
		expect(isValid()).toBeFalsy();
		// Execute the action
		act(() => {
			fieldControl({ target: { name: secondField, value: 'second test' } });
		});
		// Check the values
		expect(controls[firstField].hasErrors()).toBeFalsy();
		expect(controls[secondField].hasErrors()).toBeFalsy();
		expect(isValid()).toBeTruthy();
		// Execute the action
		act(() => {
			handleSubmit((value) => {
				// Define data
				const response = JSON.stringify(value);
				// Check the values
				expect(response).toBe(
					JSON.stringify({
						[firstField]: 'only test',
						[secondField]: 'second test',
					})
				);
			});
		});
	});
});
