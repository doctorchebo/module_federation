import React from 'react';
import { func, object, string } from 'prop-types';
import Noop from 'helpers/Noop';
import locale from '../../sections/scholars/locale/en.json';
import SForm from 'components/form';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	FieldComponent as Field,
	minLengthValidator,
	maxLengthValidator,
	patternValidator,
	phoneNumberValidator,
} from 'hooks/useForm';
import Button from 'components/button';
import Grid from 'components/grid';
import RequiredDot from 'components/requiredDot';
import Message from 'components/message';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import './index.css';

const MIN_LENGTH = 2;
const MAX_LENGTH = 255;
const EMAIL_PATTERN = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const errorMessages = locale.updateScholarForm.errorMessages;
const fields = locale.updateScholarForm.fields;
const messageError = locale.updateScholarForm.messageError;

/**
 * This function returns an Scholar Update Form Component.
 *
 * @param {object} properties Properties
 * @returns {React.Component} Return a React component
 */
export default function UpdateScholarForm(properties) {
	const { value: model, title, loading, actions: appActions } = properties;
	const { onSubmit } = properties;

	let updateScholar = { ...model, degree: '' };
	updateScholar.degree = updateScholar.academicDegree;

	const formGroupBuilder = useForm(
		new FormGroup({
			scholarId: new FormControl(updateScholar.scholarId),
			currentCity: new FormControl(
				updateScholar.currentCity,
				requiredValidator(errorMessages.currentCity.required),
				minLengthValidator(
					MIN_LENGTH,
					errorMessages.currentCity.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					errorMessages.currentCity.maxLength.replace('%s', MAX_LENGTH)
				)
			),
			phoneNumber: new FormControl(
				updateScholar.phoneNumber,
				requiredValidator(errorMessages.phoneNumber.required),
				phoneNumberValidator(errorMessages.phoneNumber.format)
			),
			email: new FormControl(
				updateScholar.personalEmail,
				requiredValidator(errorMessages.email.required),
				minLengthValidator(
					MIN_LENGTH,
					errorMessages.email.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					errorMessages.email.maxLength.replace('%s', MAX_LENGTH)
				),
				patternValidator(EMAIL_PATTERN, errorMessages.email.emailFormat)
			),
			university: new FormControl(
				updateScholar.university,
				requiredValidator(errorMessages.university.required),
				minLengthValidator(
					MIN_LENGTH,
					errorMessages.university.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					errorMessages.university.maxLength.replace('%s', MAX_LENGTH)
				)
			),
			career: new FormControl(
				updateScholar.career,
				requiredValidator(errorMessages.career.required),
				minLengthValidator(
					MIN_LENGTH,
					errorMessages.career.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					errorMessages.career.maxLength.replace('%s', MAX_LENGTH)
				)
			),
			degree: new FormControl(
				updateScholar.degree,
				requiredValidator(errorMessages.degree.required),
				minLengthValidator(
					MIN_LENGTH,
					errorMessages.degree.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					errorMessages.degree.maxLength.replace('%s', MAX_LENGTH)
				)
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
	 * Checks if the field has some validation errors.
	 *
	 * @param {object} field the field to checks
	 * @returns {boolean} true o false
	 */
	function showErrorOfField(field) {
		return field.hasErrors() && field.dirty;
	}

	return (
		<div className='update-scholar-form'>
			<header className='section-header'>
				<span className='title'>{title}</span>
			</header>

			<section>
				<Segment basic padded>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row-1'>
								<Grid.Column key='row-column-email' width='8'>
									<Field
										key='scholarId'
										as={SForm.Input}
										formControlName='scholarId'
										className='id-field'
									/>
									<Field
										key='email'
										as={SForm.Input}
										formControlName='email'
										label={
											<div className='form-label'>
												{fields.email.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.email.placeholder}
										error={showErrorOfField(controls.email)}
									/>
									<Message
										key='message-email'
										error
										visible
										hidden={!showErrorOfField(controls.email)}
										header={messageError.header}
										list={getErrorList(controls.email.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-phone-number' width='8'>
									<Field
										key='phoneNumber'
										as={SForm.Input}
										formControlName='phoneNumber'
										label={
											<div className='form-label'>
												{fields.phoneNumber.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.phoneNumber.placeholder}
										error={showErrorOfField(controls.phoneNumber)}
									/>
									<Message
										key='message-phoneNumber'
										error
										visible
										hidden={!showErrorOfField(controls.phoneNumber)}
										header={messageError.header}
										list={getErrorList(controls.phoneNumber.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-2'>
								<Grid.Column key='row-column-current-city' width='8'>
									<Field
										key='currentCity'
										as={SForm.Input}
										formControlName='currentCity'
										label={
											<div className='form-label'>
												{fields.currentCity.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.currentCity.placeholder}
										error={showErrorOfField(controls.currentCity)}
									/>
									<Message
										key='message-currentCity'
										error
										visible
										hidden={!showErrorOfField(controls.currentCity)}
										header={messageError.header}
										list={getErrorList(controls.currentCity.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-university' width='8'>
									<Field
										key='university'
										as={SForm.Input}
										formControlName='university'
										label={
											<div className='form-label'>
												{fields.university.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.university.placeholder}
										error={showErrorOfField(controls.university)}
									/>
									<Message
										key='message-university'
										error
										visible
										hidden={!showErrorOfField(controls.university)}
										header={messageError.header}
										list={getErrorList(controls.university.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-3'>
								<Grid.Column key='row-column-career' width='8'>
									<Field
										key='career'
										as={SForm.Input}
										formControlName='career'
										label={
											<div className='form-label'>
												{fields.career.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.career.placeholder}
										error={showErrorOfField(controls.career)}
									/>
									<Message
										key='message-career'
										error
										visible
										hidden={!showErrorOfField(controls.career)}
										header={messageError.header}
										list={getErrorList(controls.career.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-academic-degree' width='8'>
									<Field
										key='degree'
										as={SForm.Input}
										formControlName='degree'
										label={
											<div className='form-label'>
												{fields.academicDegree.label}
												<RequiredDot />
											</div>
										}
										placeholder={fields.academicDegree.placeholder}
										error={showErrorOfField(controls.degree)}
									/>
									<Message
										key='message-degree'
										error
										visible
										hidden={!showErrorOfField(controls.degree)}
										header={messageError.header}
										list={getErrorList(controls.degree.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>

						<div key='buttons-role' className='button-group'>
							<Button
								key='button-back'
								as={Link}
								compact
								className='button-back'
								to={`/dashboard/scholars/${updateScholar.scholarId}/details`}
								onClick={() => appActions.onHideSidebar()}
							>
								{locale.updateScholarForm.cancel}
							</Button>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.updateScholarForm.save}
								disabled={!isValid()}
								loading={loading}
							/>
						</div>
					</Form>
				</Segment>
			</section>
		</div>
	);
}

UpdateScholarForm.propTypes = {
	value: object.isRequired,
	title: string.isRequired,
	onSubmit: func,
};

UpdateScholarForm.defaultProps = {
	value: {
		name: '',
		description: '',
		permissions: [],
	},
	title: '',
	onSubmit: Noop,
};
