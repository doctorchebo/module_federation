import React from 'react';
import { func, object, string } from 'prop-types';
import Noop from 'helpers/Noop';
import locale from '../../sections/candidates/locale/en.json';
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
import { Segment, Icon } from 'semantic-ui-react';
import './index.css';
import {
	FULLNAME_MIN_LENGTH,
	FULLNAME_MAX_LENGTH,
	PHONE_NUMBER_MIN_LENGTH,
	PHONE_NUMBER_MAX_LENGTH,
	EMAIL_PATTERN,
	EMAIL_MIN_LENGTH,
	EMAIL_MAX_LENGTH,
} from '../../sections/candidates/helpers/constants';

/**
 * This function returns a Candidate Update Form Component.
 *
 * @param {object} properties properties
 * @returns {React.Component} Return a React component
 */
export default function UpdateCandidateForm(properties) {
	const { value: model, title, loading, actions: appActions } = properties;
	const { onSubmit } = properties;
	let updateCandidate = { ...model };

	const getStatus = (value) => {
		switch (value) {
			case 'None':
				return false;
			case 'Postulation':
				return true;
		}
	};

	const formGroupBuilder = useForm(
		new FormGroup({
			id: new FormControl(updateCandidate.id),
			fullName: new FormControl(
				updateCandidate.person.fullName,
				requiredValidator(locale.updateCandidateForm.errorMessages.fullName.required),
				minLengthValidator(
					FULLNAME_MIN_LENGTH,
					locale.updateCandidateForm.errorMessages.fullName.minLength.replace(
						'%s',
						FULLNAME_MIN_LENGTH
					)
				),
				maxLengthValidator(
					FULLNAME_MAX_LENGTH,
					locale.updateCandidateForm.errorMessages.fullName.maxLength.replace(
						'%s',
						FULLNAME_MAX_LENGTH
					)
				)
			),
			phoneNumber: new FormControl(
				updateCandidate.person.phoneNumber,
				requiredValidator(locale.updateCandidateForm.errorMessages.phoneNumber.required),
				phoneNumberValidator(locale.updateCandidateForm.errorMessages.phoneNumber.format),
				minLengthValidator(
					PHONE_NUMBER_MIN_LENGTH,
					locale.updateCandidateForm.errorMessages.phoneNumber.minLength.replace(
						'%s',
						PHONE_NUMBER_MIN_LENGTH
					)
				),
				maxLengthValidator(
					PHONE_NUMBER_MAX_LENGTH,
					locale.updateCandidateForm.errorMessages.phoneNumber.maxLength.replace(
						'%s',
						PHONE_NUMBER_MAX_LENGTH
					)
				)
			),
			status: new FormControl(getStatus(updateCandidate.activity.activityType.description)),
			resume: new FormControl(updateCandidate.profile.pathResume),
			program: new FormControl(updateCandidate.programVersionName),
			personalEmail: new FormControl(
				updateCandidate.person.personalEmail,
				requiredValidator(locale.updateCandidateForm.errorMessages.email.required),
				minLengthValidator(
					EMAIL_MIN_LENGTH,
					locale.updateCandidateForm.errorMessages.email.minLength.replace(
						'%s',
						EMAIL_MIN_LENGTH
					)
				),
				maxLengthValidator(
					EMAIL_MAX_LENGTH,
					locale.updateCandidateForm.errorMessages.email.maxLength.replace(
						'%s',
						EMAIL_MAX_LENGTH
					)
				),
				patternValidator(
					EMAIL_PATTERN,
					locale.updateCandidateForm.errorMessages.email.emailFormat
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

	/**
	 * Checks if the form is dirty.
	 *
	 * @returns {boolean} true o false
	 */
	function isDirty() {
		let stateControl = [];
		for (const property in controls) {
			stateControl.push(controls[property].dirty);
		}
		return stateControl.includes(true);
	}

	return (
		<div className='update-candidate-form'>
			<header className='section-header'>
				<span className='title'>{title}</span>
			</header>
			<section>
				<Segment basic padded>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row-1'>
								<Grid.Column key='row-column-full-name' width='8'>
									<Field
										key='id'
										as={SForm.Input}
										formControlName='id'
										className='id-field'
									/>
									<Field
										key='fullName'
										as={SForm.Input}
										formControlName='fullName'
										label={
											<div className='form-label'>
												{locale.updateCandidateForm.fields.fullName.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateCandidateForm.fields.fullName.placeholder
										}
										error={showErrorOfField(controls.fullName)}
									/>
									<Message
										key='message-fullName'
										error
										visible
										hidden={!showErrorOfField(controls.fullName)}
										header={locale.updateCandidateForm.messageError.header}
										list={getErrorList(controls.fullName.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-program' width='8'>
									<Field
										key='program'
										as={SForm.Input}
										formControlName='program'
										readOnly={true}
										label={
											<div className='form-label'>
												{
													locale.updateCandidateForm.fields.currentProgram
														.label
												}
											</div>
										}
										placeholder={
											locale.updateCandidateForm.fields.currentProgram
												.placeholder
										}
										error={showErrorOfField(controls.program)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row key='grid-row-2'>
								<Grid.Column key='row-column-phone-number' width='8'>
									<Field
										key='phoneNumber'
										as={SForm.Input}
										formControlName='phoneNumber'
										label={
											<div className='form-label'>
												{
													locale.updateCandidateForm.fields.phoneNumber
														.label
												}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateCandidateForm.fields.phoneNumber
												.placeholder
										}
										error={showErrorOfField(controls.phoneNumber)}
									/>
									<Message
										key='message-phoneNumber'
										error
										visible
										hidden={!showErrorOfField(controls.phoneNumber)}
										header={locale.updateCandidateForm.messageError.header}
										list={getErrorList(controls.phoneNumber.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-column-email' width='8'>
									<Field
										key='personalEmail'
										as={SForm.Input}
										formControlName='personalEmail'
										label={
											<div className='form-label'>
												{locale.updateCandidateForm.fields.email.label}
												<RequiredDot />
											</div>
										}
										placeholder={
											locale.updateCandidateForm.fields.email.placeholder
										}
										error={showErrorOfField(controls.personalEmail)}
									/>
									<Message
										key='message-email'
										error
										visible
										hidden={!showErrorOfField(controls.personalEmail)}
										header={locale.updateCandidateForm.messageError.header}
										list={getErrorList(controls.personalEmail.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column key='row-colum-resume' width='8'>
									<p>Resume</p>
									<div key='download-1' className='container-download'>
										<Icon
											key='icon-1'
											size='large'
											className='download-icon'
											name={'file alternate'}
										></Icon>
										<a
											key='path'
											href={updateCandidate.profile.pathResume}
											className='download'
											target='_blank'
											rel='noreferrer'
										>
											Open File
										</a>
									</div>
								</Grid.Column>
								<Grid.Column key='row-column-active' width='8'>
									<div>{locale.updateCandidateForm.fields.sign_off.label}</div>
									<Field
										key='status'
										as={(props) => (
											<>
												<div
													key='checkbox-container'
													className='checkbox-toggle-container'
												>
													<div className='checkbox-toggle'>
														<input
															{...props}
															checked={props.value}
															onChange={() =>
																props.onChange({
																	target: {
																		name: props.name,
																		value: !props.value,
																	},
																})
															}
														/>
													</div>
												</div>
											</>
										)}
										type='checkbox'
										className='cm-toggle color-primary'
										formControlName='status'
										error={controls.status.hasErrors() && controls.status.dirty}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<div key='buttons-candidate' className='button-group'>
							<Button
								key='button-back'
								as={Link}
								compact
								className='button-back'
								to='/dashboard/candidates'
								onClick={() => appActions.onHideSidebar()}
							>
								{locale.updateCandidateForm.cancel}
							</Button>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.updateCandidateForm.save}
								disabled={!isDirty() || !isValid()}
								loading={loading}
							/>
						</div>
					</Form>
				</Segment>
			</section>
		</div>
	);
}

UpdateCandidateForm.propTypes = {
	value: object.isRequired,
	title: string.isRequired,
	onSubmit: func,
	onChange: func,
	name: string,
};

UpdateCandidateForm.defaultProps = {
	value: {
		name: '',
		description: '',
	},
	title: '',
	onSubmit: Noop,
};
