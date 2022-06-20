import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FieldComponent } from '../Field';
import { FormControl, FormGroup } from 'hooks/useForm/models';
import { minLengthValidator, patternValidator, requiredValidator } from 'hooks/useForm/validators';
import { FormComponent } from '../Form';

describe('FormComponent', () => {
	describe('Complex structure', () => {
		const setup = () => {
			const firstField = 'firsField';
			const secondField = 'secondField';
			let formGroup = new FormGroup({
				[firstField]: new FormControl(
					'firstValue',
					requiredValidator(new Error()),
					patternValidator(/only test/, 'pattern invalid')
				),
				[secondField]: new FormControl(
					'secondField',
					requiredValidator(),
					minLengthValidator(5)
				),
			});
			const fieldControl = (changeEvent, getFormGroup) => {
				const { name, value } = changeEvent.target;
				const abstractControl = getFormGroup(formGroup);
				const control = abstractControl.getControl(name);
				control.setValue(value);
				control.dirty = true;
				formGroup = new FormGroup(formGroup.controls, formGroup.abstractControlOptions);
				formGroupBuilder = {
					...formGroup,
					isValid: formGroup.isValid,
					handleSubmit,
					fieldControl,
				};
			};
			const handleSubmit = (func) => {
				return (submitEvent) => {
					submitEvent.preventDefault();
					func(formGroup.value);
				};
			};
			let formGroupBuilder = {
				...formGroup,
				get isValid() {
					return formGroup.isValid;
				},
				handleSubmit,
				fieldControl,
			};
			const onSubmit = (value) => value;
			const component = render(
				<FormComponent key='form' onSubmit={onSubmit} formGroupBuilder={formGroupBuilder}>
					<FieldComponent
						key='input-01'
						formControlName={firstField}
						fieldControl={formGroupBuilder.fieldControl}
						getFormGroup={(form) => form}
						controls={formGroup.controls}
					/>
					<FieldComponent
						key='input-02'
						formControlName={secondField}
						fieldControl={formGroupBuilder.fieldControl}
						getFormGroup={(form) => form}
						controls={formGroup.controls}
					/>
					<button key='button-submit' type='submit' disabled={!formGroupBuilder.isValid}>
						Submit
					</button>
				</FormComponent>
			);
			return {
				firstField,
				secondField,
				formGroupBuilder,
				component,
			};
		};
		test('Should render into form element', () => {
			const {
				component: { container },
			} = setup();
			expect(container.firstChild).toBeInstanceOf(HTMLFormElement);
		});
		test('Should be disabled the submit button', () => {
			const {
				component: { container },
			} = setup();
			expect(container.firstChild.lastChild).toBeInstanceOf(HTMLButtonElement);
			expect(container.firstChild.lastChild.disabled).toBeTruthy();
		});
		test('Should not be disabled the submit button', () => {
			const {
				formGroupBuilder,
				component: { container },
			} = setup();
			fireEvent.change(container.firstChild.firstChild, { target: { value: 'only test' } });
			fireEvent.change(container.firstChild.childNodes[1], {
				target: { value: 'five required' },
			});
			expect(formGroupBuilder.isValid).toBeTruthy();
		});
	});
});
