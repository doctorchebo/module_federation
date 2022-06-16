import React from 'react';
import { func, object, string } from 'prop-types';
import Noop from 'helpers/Noop';
import locale from '../../sections/users/locale/en.json';
import SForm from 'components/form';
import SelectAdapter from 'components/form/selectAdapter';
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
const CI_MIN_LENGTH = 5;
const CI_MAX_LENGTH = 10;
const ISSUED_MAX_LENGTH = 4;
const ONLY_NUMBERS_PATTERN = /^[0-9]+$/;
const EMAIL_PATTERN = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * This function returns an User Update Form Component.
 *
 * @param {object} properties Properties
 * @returns {React.Component} Return a React component
 */
export default function UpdateUserForm(properties) {
	const { value: model, title, loading, actions: appActions, roles } = properties;
	const { onSubmit } = properties;

	let updateUser = { ...model };

	const formGroupBuilder = useForm(
		new FormGroup({
			id: new FormControl(updateUser.id),
			firstName: new FormControl(
				updateUser.firstName,
				requiredValidator(locale.updateUserForm.errorMessages.firstName.required),
				minLengthValidator(
					MIN_LENGTH,
					locale.updateUserForm.errorMessages.firstName.minLength.replace(
						'%s',
						MIN_LENGTH
					)
				),
				maxLengthValidator(
					MAX_LENGTH,
					locale.updateUserForm.errorMessages.firstName.maxLength.replace(
						'%s',
						MAX_LENGTH
					)
				)
			),
			lastName: new FormControl(
				updateUser.lastName,
				requiredValidator(locale.updateUserForm.errorMessages.lastName.required),
				minLengthValidator(
					MIN_LENGTH,
					locale.updateUserForm.errorMessages.lastName.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					locale.updateUserForm.errorMessages.lastName.maxLength.replace('%s', MAX_LENGTH)
				)
			),
			ci: new FormControl(
				`${updateUser.ci}`,
				requiredValidator(locale.updateUserForm.errorMessages.ci.required),
				minLengthValidator(
					CI_MIN_LENGTH,
					locale.updateUserForm.errorMessages.ci.minLength.replace('%s', CI_MIN_LENGTH)
				),
				maxLengthValidator(
					CI_MAX_LENGTH,
					locale.updateUserForm.errorMessages.ci.maxLength.replace('%s', CI_MAX_LENGTH)
				),
				patternValidator(
					ONLY_NUMBERS_PATTERN,
					locale.updateUserForm.errorMessages.ci.onlyNumbers
				)
			),
			issued: new FormControl(
				updateUser.issued,
				requiredValidator(locale.updateUserForm.errorMessages.issued.required),
				minLengthValidator(
					MIN_LENGTH,
					locale.updateUserForm.errorMessages.issued.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					ISSUED_MAX_LENGTH,
					locale.updateUserForm.errorMessages.issued.maxLength.replace(
						'%s',
						ISSUED_MAX_LENGTH
					)
				)
			),
			currentCity: new FormControl(
				updateUser.currentCity,
				requiredValidator(locale.updateUserForm.errorMessages.currentCity.required),
				minLengthValidator(
					MIN_LENGTH,
					locale.updateUserForm.errorMessages.currentCity.minLength.replace(
						'%s',
						MIN_LENGTH
					)
				),
				maxLengthValidator(
					MAX_LENGTH,
					locale.updateUserForm.errorMessages.currentCity.maxLength.replace(
						'%s',
						MAX_LENGTH
					)
				)
			),
			phoneNumber: new FormControl(
				updateUser.phoneNumber,
				requiredValidator(locale.updateUserForm.errorMessages.phoneNumber.required),
				phoneNumberValidator(locale.updateUserForm.errorMessages.phoneNumber.format)
			),
			email: new FormControl(
				updateUser.email,
				requiredValidator(locale.updateUserForm.errorMessages.email.required),
				minLengthValidator(
					MIN_LENGTH,
					locale.updateUserForm.errorMessages.email.minLength.replace('%s', MIN_LENGTH)
				),
				maxLengthValidator(
					MAX_LENGTH,
					locale.updateUserForm.errorMessages.email.maxLength.replace('%s', MAX_LENGTH)
				),
				patternValidator(
					EMAIL_PATTERN,
					locale.updateUserForm.errorMessages.email.emailFormat
				)
			),
			role: new FormControl(
				updateUser.roles[0],
				requiredValidator(locale.updateUserForm.errorMessages.role.required)
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

	/**
	 * Returns a new array to use into Select Component.
	 *
	 * @param {Array} roles This is an array of roles.
	 * @returns {Array} Returns a new array to Options into Select Component.
	 */
	function rolesToOptions(roles) {
		return roles.map((role) => ({
			key: role.id,
			text: role.name,
			value: role,
		}));
	}

	return (
		<div className='update-user-form'>
			<header className='section-header'>
				<span className='title'>{title}</span>
			</header>

			<section>
				<Segment basic padded>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row-1'>
								<Grid.Column key='row-column-first-name' width='8'>
									<Field
										key='id'
										as={SForm.Input}
										formControlName='id'
										className='id-field'
									/>
									<Field
										key='firstName'
										as={SForm.Input}
										formControlName='firstName'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.firstName.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateUserForm.fields.firstName.placeholder
										}
										error={showErrorOfField(controls.firstName)}
									/>
									<Message
										key='message-firstName'
										error
										visible
										hidden={!showErrorOfField(controls.firstName)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.firstName.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-last-name' width='8'>
									<Field
										key='lastName'
										as={SForm.Input}
										formControlName='lastName'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.lastName.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateUserForm.fields.lastName.placeholder
										}
										error={showErrorOfField(controls.lastName)}
									/>
									<Message
										key='message-lastName'
										error
										visible
										hidden={!showErrorOfField(controls.lastName)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.lastName.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-2'>
								<Grid.Column key='row-column-ci' width='8'>
									<Field
										key='ci'
										as={SForm.Input}
										formControlName='ci'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.ci.label}
												<RequiredDot />
											</div>
										}
										placeholder={locale.updateUserForm.fields.ci.placeholder}
										error={showErrorOfField(controls.ci)}
									/>
									<Message
										key='message-ci'
										error
										visible
										hidden={!showErrorOfField(controls.ci)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.ci.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-issued' width='8'>
									<Field
										key='issued'
										as={SForm.Input}
										formControlName='issued'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.issued.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateUserForm.fields.issued.placeholder
										}
										error={showErrorOfField(controls.issued)}
									/>
									<Message
										key='message-issued'
										error
										visible
										hidden={!showErrorOfField(controls.issued)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.issued.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-3'>
								<Grid.Column key='row-column-current-city' width='8'>
									<Field
										key='currentCity'
										as={SForm.Input}
										formControlName='currentCity'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.currentCity.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateUserForm.fields.currentCity.placeholder
										}
										error={showErrorOfField(controls.currentCity)}
									/>
									<Message
										key='message-currentCity'
										error
										visible
										hidden={!showErrorOfField(controls.currentCity)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.currentCity.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-phone-number' width='8'>
									<Field
										key='phoneNumber'
										as={SForm.Input}
										formControlName='phoneNumber'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.phoneNumber.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateUserForm.fields.phoneNumber.placeholder
										}
										error={showErrorOfField(controls.phoneNumber)}
									/>
									<Message
										key='message-phoneNumber'
										error
										visible
										hidden={!showErrorOfField(controls.phoneNumber)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.phoneNumber.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-4'>
								<Grid.Column key='row-column-email' width='8'>
									<Field
										key='email'
										as={SForm.Input}
										formControlName='email'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.email.label}
												<RequiredDot />
											</div>
										}
										placeholder={locale.updateUserForm.fields.email.placeholder}
										error={showErrorOfField(controls.role)}
									/>
									<Message
										key='message-email'
										error
										visible
										hidden={!showErrorOfField(controls.email)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.email.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-role' width='8'>
									<Field
										key='role'
										as={SelectAdapter}
										formControlName='role'
										label={
											<div className='form-label'>
												{locale.updateUserForm.fields.role.label}
												<RequiredDot />
											</div>
										}
										options={rolesToOptions(roles) || []}
										placeholder={locale.updateUserForm.fields.role.placeholder}
										error={showErrorOfField(controls.role)}
									/>
									<Message
										key='message-role'
										error
										visible
										hidden={!showErrorOfField(controls.role)}
										header={locale.updateUserForm.messageError.header}
										list={getErrorList(controls.role.errors)}
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
								to='/dashboard/users'
								onClick={() => appActions.onHideSidebar()}
							>
								{locale.updateUserForm.cancel}
							</Button>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.updateUserForm.save}
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

UpdateUserForm.propTypes = {
	value: object.isRequired,
	title: string.isRequired,
	onSubmit: func,
};

UpdateUserForm.defaultProps = {
	value: {
		name: '',
		description: '',
		permissions: [],
	},
	title: '',
	onSubmit: Noop,
};
