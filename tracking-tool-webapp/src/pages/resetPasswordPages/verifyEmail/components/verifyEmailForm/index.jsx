import React from 'react';
import Button from 'components/button';
import useForm, {
	FormGroup,
	FormControl,
	emailValidator,
	FormComponent as Form,
	FieldComponent as Field,
} from 'hooks/useForm';
import Message from 'components/message';
import SForm from 'components/form';
import RequiredDot from 'components/requiredDot';

/**
 * @param {*} properties -
 * @returns {React.Component} - VerifyEmail Component
 */
export default function VerifyEmailForm(properties) {
	const { onSubmit, model, locale } = properties;

	const formGroupBuilder = useForm(
		new FormGroup({
			email: new FormControl(model.email, emailValidator(locale.errorMessages.email.format)),
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

	return (
		<Form
			className='verify-form'
			as={SForm}
			formGroupBuilder={formGroupBuilder}
			onSubmit={onSubmit}
		>
			<Field
				key='email'
				as={SForm.Input}
				formControlName='email'
				label={
					<div className='form-label'>
						{locale.fields.email.label}
						<RequiredDot />
					</div>
				}
				placeholder={locale.fields.email.placeholder}
				error={controls.email.hasErrors() && controls.email.dirty}
			/>
			<Message
				key='message-email'
				error
				visible
				hidden={!(controls.email.hasErrors() && controls.email.dirty)}
				header={locale.fields.email.error}
				list={getErrorList(controls.email.errors)}
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
