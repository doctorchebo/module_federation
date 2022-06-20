import React, { useState, useCallback } from 'react';
import { Icon } from 'semantic-ui-react';
import Button from 'components/button';
import useForm, {
	FormGroup,
	FormControl,
	passwordValidator,
	minLengthValidator,
	FormComponent as Form,
	FieldComponent as Field,
} from 'hooks/useForm';
import Message from 'components/message';
import SForm from 'components/form';
import RequiredDot from 'components/requiredDot';

/**
 * @param {*} properties -
 * @returns {React.Component} - ResetPasswordForm
 */
export default function ResetPasswordForm(properties) {
	const { onSubmit, model, locale } = properties;
	const [hide, setHide] = useState(true);
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	const minLengthCode = 6;

	const formGroupBuilder = useForm(
		new FormGroup({
			code: new FormControl(
				model.code,
				minLengthValidator(
					minLengthCode,
					locale.errorMessages.code.format.replace('%s', minLengthCode)
				)
			),
			newPassword: new FormControl(
				model.newPassword,
				passwordValidator(locale.errorMessages.newPassword.format)
			),
			confirmPassword: new FormControl(
				model.confirmPassword,
				passwordValidator(locale.errorMessages.confirmPassword.format)
			),
		})
	);

	const { isValid, controls } = formGroupBuilder;

	/**
	 * This function get an error list.
	 *
	 * @param {{string: any}} errors These are errors from a FormGroup.
	 * @returns {Array} Returns an array of errors.
	 */
	function getErrorList(errors) {
		return Object.values(errors).filter((error) => error !== null);
	}

	/**
	 * Handles additional validation of form before submit it.
	 *
	 * @param {object} value the form value
	 */
	function handleOnSubmit(value) {
		if (controls.newPassword.value === controls.confirmPassword.value) {
			onSubmit(value);
		} else {
			controls.confirmPassword.errors = {
				match: locale.errorMessages.confirmPassword.match,
			};
			forceUpdate();
		}
	}

	return (
		<Form
			as={SForm}
			className='change-password-form'
			formGroupBuilder={formGroupBuilder}
			onSubmit={handleOnSubmit}
		>
			<Field
				type={hide ? 'password' : ''}
				icon={<Icon name='eye' link onClick={() => setHide(!hide)} />}
				key='code'
				as={SForm.Input}
				formControlName='code'
				label={
					<div className='form-label'>
						{locale.fields.code.label}
						<RequiredDot />
					</div>
				}
				placeholder={locale.fields.code.placeholder}
				error={controls.code.hasErrors() && controls.code.dirty}
			/>
			<Message
				key='code-message'
				error
				visible
				hidden={!(controls.code.hasErrors() && controls.code.dirty)}
				header={locale.fields.code.error}
				list={getErrorList(controls.code.errors)}
			/>
			<Field
				type={hide ? 'password' : ''}
				icon={<Icon name='eye' link onClick={() => setHide(!hide)} />}
				key='newPassword'
				as={SForm.Input}
				formControlName='newPassword'
				label={
					<div className='form-label'>
						{locale.fields.newPassword.label}
						<RequiredDot />
					</div>
				}
				placeholder={locale.fields.newPassword.placeholder}
				error={controls.newPassword.hasErrors() && controls.newPassword.dirty}
			/>
			<Message
				key='newPassword-message'
				error
				visible
				hidden={!(controls.newPassword.hasErrors() && controls.newPassword.dirty)}
				header={locale.fields.newPassword.error}
				list={getErrorList(controls.newPassword.errors)}
			/>
			<Field
				type={hide ? 'password' : ''}
				icon={<Icon name='eye' link onClick={() => setHide(!hide)} />}
				key='confirmPassword'
				as={SForm.Input}
				formControlName='confirmPassword'
				label={
					<div className='form-label'>
						{locale.fields.confirmPassword.label}
						<RequiredDot />
					</div>
				}
				placeholder={locale.fields.confirmPassword.placeholder}
				error={controls.confirmPassword.hasErrors() && controls.confirmPassword.dirty}
			/>
			<Message
				key='confirmPassword-message'
				error
				visible
				hidden={!(controls.confirmPassword.hasErrors() && controls.confirmPassword.dirty)}
				header={locale.fields.confirmPassword.error}
				list={getErrorList(controls.confirmPassword.errors)}
			/>
			<Button
				key='button-save'
				id='submit-button'
				type='submit'
				content={locale.save}
				disabled={!isValid()}
			/>
		</Form>
	);
}
