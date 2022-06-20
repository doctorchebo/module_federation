import { maxLengthValidator, requiredValidator } from 'hooks/useForm/validators';
import { FormControl } from '../FormControl';
import { FormGroup } from '../FormGroup';

describe('FormGroup', () => {
	test('Should returns Error when error key not exist', () => {
		const formGroup = new FormGroup();
		expect(formGroup.hasErrors()).toBeFalsy();
		expect(() => {
			formGroup.getError('required');
		}).toThrowError(Error);
		expect(() => {
			formGroup.hasError('required');
		}).toThrow();
		// check valid
		expect(formGroup.isValid).toBeTruthy();
	});
	test('Should returns null and empty the value and validators when FormGroup is empty', () => {
		const formGroup = new FormGroup();
		expect(JSON.stringify(formGroup.value)).toBe(JSON.stringify({}));
		expect(formGroup.validators).toHaveLength(0);
		// checking errors
		expect(formGroup.hasErrors()).toBeFalsy();
		// check valid
		expect(formGroup.isValid).toBeTruthy();
	});
	test('Should returns his value and validators', () => {
		const expectedValue = { field: null };
		const expectedValidators = [requiredValidator(new Error())];
		const field = 'field';
		const formGroup = new FormGroup(
			{ [field]: new FormControl(undefined, ...expectedValidators) },
			{ validators: expectedValidators }
		);
		expect(JSON.stringify(formGroup.value)).toBe(JSON.stringify(expectedValue));
		expect(formGroup.validators[0].name).toBe(expectedValidators[0].name);
		// checking errors of FormGroup
		expect(formGroup.hasErrors()).toBeFalsy();
		expect(() => formGroup.hasError('required')).toThrow(Error);
		expect(() => formGroup.getError('required')).toThrow(Error);
		// checking errors of FormControl
		const formControl = formGroup.getControl(field);
		expect(formControl.hasErrors()).toBeTruthy();
		expect(formControl.hasError('required')).toBeTruthy();
		expect(formControl.getError('required')).toBeInstanceOf(Error);
		// check valid
		expect(formGroup.isValid).toBeFalsy();
	});
	test('Should returns false when isValid is called and the value is undefined', () => {
		const expectedError = 'expected error';
		const expectedValidators = [requiredValidator(expectedError)];
		const expectedValue = JSON.stringify({});
		const formGroup = new FormGroup(undefined, { validators: expectedValidators });
		expect(JSON.stringify(formGroup.value)).toBe(expectedValue);
		// checking errors of FormGroup
		expect(formGroup.hasErrors()).toBeTruthy();
		expect(formGroup.hasError('required')).toBeTruthy();
		expect(formGroup.getError('required')).toBe(expectedError);
		// check valid
		expect(formGroup.isValid).toBeFalsy();
	});
	test('Should returns true when isValid is called', () => {
		const expectedValidators = [requiredValidator(), maxLengthValidator(7)];
		const field = 'field';
		const formGroup = new FormGroup({
			[field]: new FormControl('default', ...expectedValidators),
		});
		// checking errors of FormGroup
		expect(formGroup.hasErrors()).toBeFalsy();
		// checking errors of FormControl
		const formControl = formGroup.getControl(field);
		expect(formControl.hasErrors()).toBeFalsy();
		expect(() => formControl.hasError('required')).toThrow(Error);
		expect(() => formControl.getError('maxLength')).toThrow(Error);
		// check valid
		expect(formGroup.isValid).toBeTruthy();
	});
	test('Should returns false when isValid is called', () => {
		const expectedValidators = [requiredValidator(), maxLengthValidator(2)];
		const field = 'field';
		const formGroup = new FormGroup({
			[field]: new FormControl('default', ...expectedValidators),
		});
		// checking errors of FormGroup
		expect(formGroup.hasErrors()).toBeFalsy();
		// checking errors of FormControl
		const formControl = formGroup.getControl(field);
		expect(formControl.hasErrors()).toBeTruthy();
		expect(() => formControl.hasError('required')).toThrow(Error);
		expect(() => formControl.getError('maxLength')).toThrow(Error);
		// check valid
		expect(formGroup.isValid).toBeFalsy();
	});
	test('Should returns true when a field is modified and a new FormGroup is created', () => {
		const expectedValidators = [requiredValidator(), maxLengthValidator(5)];
		const field = 'field';
		const formGroup = new FormGroup({
			[field]: new FormControl('default', ...expectedValidators),
		});
		// The value of a FormControl is changed
		const formControl = formGroup.getControl(field);
		// check valid of old FormGroup
		expect(formGroup.isValid).toBeFalsy();
		formControl.setValue('new');
		const newFormGroup = new FormGroup(formGroup.controls, formGroup.abstractControlOptions);
		// check valid of new FormGroup
		expect(newFormGroup.isValid).toBeTruthy();
	});
	test('Should returns false when a field is modified and a new FormGroup is created', () => {
		const expectedValidators = [requiredValidator(), maxLengthValidator(5)];
		const field = 'field';
		const formGroup = new FormGroup({
			[field]: new FormControl('old', ...expectedValidators),
		});
		// The value of a FormControl is changed
		const formControl = formGroup.getControl(field);
		// check valid of old FormGroup
		expect(formGroup.isValid).toBeTruthy();
		formControl.setValue('new value');
		const newFormGroup = new FormGroup(formGroup.controls, formGroup.abstractControlOptions);
		// check valid of new FormGroup
		expect(newFormGroup.isValid).toBeFalsy();
	});
});
