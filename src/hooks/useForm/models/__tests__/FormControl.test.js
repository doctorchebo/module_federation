import { minLengthValidator, requiredValidator } from 'hooks/useForm/validators';
import { FormControl } from '../FormControl';

describe('FormControl', () => {
	test('Should returns Error when error key not exist', () => {
		const formControl = new FormControl();
		expect(formControl.hasErrors()).toBeFalsy();
		expect(() => {
			formControl.getError('required');
		}).toThrowError('Error not found');
		expect(() => {
			formControl.hasError('required');
		}).toThrow();
		// check valid
		expect(formControl.isValid).toBeTruthy();
	});
	test('Should returns null and empty the value and validators when FormControl is empty', () => {
		const formControl = new FormControl();
		expect(formControl.value).toBeNull();
		expect(formControl.validators).toHaveLength(0);
		// checking errors
		expect(formControl.hasErrors()).toBeFalsy();
		// check valid
		expect(formControl.isValid).toBeTruthy();
	});
	test('Should returns his value and validators', () => {
		const expectedValue = 'default';
		const expectedValidators = [requiredValidator()];
		const formControl = new FormControl(expectedValue, ...expectedValidators);
		expect(formControl.value).toBe(expectedValue);
		expect(formControl.validators[0].name).toBe(expectedValidators[0].name);
		// checking errors
		expect(formControl.hasErrors()).toBeFalsy();
		expect(() => formControl.hasError('required')).toThrowError('Error not found');
		expect(() => formControl.getError('required')).toThrow(Error);
		// check valid
		expect(formControl.isValid).toBeTruthy();
	});
	test('Should returns true when isValid is called', () => {
		const expectedValidators = [requiredValidator(), minLengthValidator(2)];
		const formControl = new FormControl('default', ...expectedValidators);
		// checking errors
		expect(formControl.hasErrors()).toBeFalsy();
		expect(() => formControl.hasError('required')).toThrow(Error);
		expect(() => formControl.getError('minLength')).toThrowError('Error not found');
		// check valid
		expect(formControl.isValid).toBeTruthy();
	});
	test('Should returns false when isValid is called', () => {
		const expectedValidators = [requiredValidator(), minLengthValidator(5)];
		const formControl = new FormControl('min', ...expectedValidators);
		// checking errors
		expect(formControl.hasErrors()).toBeTruthy();
		expect(() => formControl.hasError('required')).toThrowError('Error not found');
		expect(formControl.getError('minLength')).toBeTruthy();
		// check valid
		expect(formControl.isValid).toBeFalsy();
	});
	test('Should returns false when isValid is called and the value is undefined', () => {
		const expectedError = 'expected error';
		const expectedValidators = [requiredValidator(expectedError)];
		const formControl = new FormControl(undefined, ...expectedValidators);
		expect(formControl.value).toBeNull();
		// checking errors
		expect(formControl.hasErrors()).toBeTruthy();
		expect(formControl.hasError('required')).toBeTruthy();
		expect(formControl.getError('required')).toBe(expectedError);
		// check valid
		expect(formControl.isValid).toBeFalsy();
	});
	test('Should returns true when isValid is called and value is modified', () => {
		const expectedValidators = [requiredValidator()];
		const formControl = new FormControl(0, ...expectedValidators);
		expect(formControl.isValid).toBeFalsy();
		formControl.setValue(1);
		formControl.updateControl();
		// checking errors
		expect(formControl.hasErrors()).toBeFalsy();
		expect(() => formControl.hasError('required')).toThrow(Error);
		expect(() => formControl.getError('required')).toThrow(Error);
		// check valid
		expect(formControl.isValid).toBeTruthy();
	});
	test('Should returns false when isValid is called and value is modified', () => {
		const expectedValidators = [requiredValidator()];
		const formControl = new FormControl(1, ...expectedValidators);
		expect(formControl.isValid).toBeTruthy();
		formControl.setValue(0);
		formControl.updateControl();
		// checking errors
		expect(formControl.hasErrors()).toBeTruthy();
		expect(formControl.hasError('required')).toBeTruthy();
		expect(formControl.getError('required')).toBeTruthy();
		// check valid
		expect(formControl.isValid).toBeFalsy();
	});
});
