import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldComponent } from '../Field';
import { FormControl, FormGroup } from 'hooks/useForm/models';
import { minLengthValidator, requiredValidator } from 'hooks/useForm/validators';

describe('FieldComponent', () => {
	describe('Simple structure', () => {
		const setup = () => {
			const field = 'field';
			let formGroup = new FormGroup({ [field]: new FormControl('') });
			const component = render(
				<FieldComponent
					formControlName={field}
					fieldControl={(changeEvent, getFormGroup) => {
						const { name, value } = changeEvent.target;
						const abstractControl = getFormGroup(formGroup);
						const control = abstractControl.getControl(name);
						control.setValue(value);
						control.dirty = true;
						formGroup = new FormGroup(
							formGroup.controls,
							formGroup.abstractControlOptions
						);
					}}
					getFormGroup={(form) => form}
					controls={formGroup.controls}
					value=''
				/>
			);
			return {
				field,
				formGroup,
				component,
			};
		};
		test('Should render into input element', () => {
			const {
				component: { container },
			} = setup();
			expect(container.firstChild).toBeInstanceOf(HTMLInputElement);
		});
		test('Should change the value of formControl when onChange is detected', () => {
			const {
				field,
				component: { container },
				formGroup,
			} = setup();
			const expected = '23';
			fireEvent.change(container.firstChild, { target: { value: expected } });
			expect(formGroup.controls[field].value).toBe(expected);
		});
	});
	describe('Simple structure with one validator', () => {
		const setup = () => {
			const field = 'field';
			const fieldRequiredMessage = 'This field is required';
			let formGroup = new FormGroup({
				[field]: new FormControl('', requiredValidator(fieldRequiredMessage)),
			});
			const component = render(
				<FieldComponent
					formControlName={field}
					fieldControl={(changeEvent, getFormGroup) => {
						const { name, value } = changeEvent.target;
						const abstractControl = getFormGroup(formGroup);
						const control = abstractControl.getControl(name);
						control.setValue(value);
						control.dirty = true;
						formGroup = new FormGroup(
							formGroup.controls,
							formGroup.abstractControlOptions
						);
					}}
					getFormGroup={(form) => form}
					controls={formGroup.controls}
					value=''
				/>
			);
			return {
				fieldRequiredMessage,
				field,
				formGroup,
				component,
			};
		};
		test('Should change the property isValid from false to true', () => {
			const {
				fieldRequiredMessage,
				field,
				component: { container },
				formGroup,
			} = setup();
			expect(formGroup.isValid).toBeFalsy();
			expect(formGroup.controls[field].hasErrors()).toBeTruthy();
			expect(formGroup.controls[field].hasError('required')).toBeTruthy();
			expect(formGroup.controls[field].getError('required')).toBe(fieldRequiredMessage);
			fireEvent.change(container.firstChild, { target: { value: 'expected' } });
			expect(formGroup.isValid).toBeTruthy();
			expect(formGroup.controls[field].hasErrors()).toBeFalsy();
			expect(() => formGroup.controls[field].hasError('required')).toThrow(Error);
			expect(() => formGroup.controls[field].getError('required')).toThrow(Error);
		});
	});
	describe('Complex structure with validators', () => {
		const setup = () => {
			const field = 'firstField';
			const defaultValue = 'first';
			const errorMinLength = new Error('This field should have more than 7 chars');
			let formGroup = new FormGroup({
				[field]: new FormControl(
					defaultValue,
					requiredValidator(),
					minLengthValidator(7, errorMinLength)
				),
			});
			const component = render(
				<FieldComponent
					formControlName={field}
					fieldControl={(changeEvent, getFormGroup) => {
						const { name, value } = changeEvent.target;
						const abstractControl = getFormGroup(formGroup);
						const control = abstractControl.getControl(name);
						control.setValue(value);
						control.dirty = true;
						formGroup = new FormGroup(
							formGroup.controls,
							formGroup.abstractControlOptions
						);
					}}
					getFormGroup={(form) => form}
					controls={formGroup.controls}
					value=''
				/>
			);
			return {
				defaultValue,
				errorMinLength,
				field,
				formGroup,
				component,
			};
		};
		test('Should have an value by default', () => {
			const { errorMinLength, field, defaultValue, formGroup } = setup();
			expect(formGroup.controls[field].value).toBe(defaultValue);
			expect(formGroup.controls[field].hasErrors()).toBeTruthy();
			expect(() => formGroup.controls[field].hasError('required')).toThrow(Error);
			expect(formGroup.controls[field].getError('minLength').message).toBe(
				errorMinLength.message
			);
		});
		test('Should change the property isValid from false to true', () => {
			const {
				component: { container },
				formGroup,
			} = setup();
			expect(formGroup.isValid).toBeFalsy();
			fireEvent.change(container.firstChild, { target: { value: 'expected' } });
			expect(formGroup.isValid).toBeTruthy();
		});
	});
});
