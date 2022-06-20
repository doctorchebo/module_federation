import React, { ElementType } from 'react';
import { Form as SForm, Button as SButton } from 'semantic-ui-react';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	FieldComponent as Field,
	minLengthValidator,
	maxLengthValidator,
} from 'hooks/useForm';
import SelectAdapter from 'components/form/selectAdapter';
import PropTypes, { array, func, number, object, string } from 'prop-types';
import Message from 'components/message';
import './styles.css';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';
import DatePicker from 'react-datepicker';
import isWeekday from '../../sections/programVersions/helpers/isWeekey';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
/**
 * This function returns an Form Component.
 *
 * @param {object} properties Properties.
 * @returns {ElementType} Return an Element Type.
 */
export default function ProgramVersionsForm(properties) {
	const { errorMessages, eventForm, eventFormAction, onSubjectChange, programVersionRename } =
		properties;
	const {
		stageId,
		subjectId,
		stages,
		trainerId,
		trainers,
		stageEndDate,
		stageStartDate,
		renameVersion,
	} = properties;
	const { onCancel, onSubmit } = properties;
	const options = {
		version: {
			minLength: 5,
			maxLength: 15,
		},
		stage: {
			minLength: 5,
			maxLength: 15,
		},
		subject: {
			minLength: 5,
			maxLength: 15,
		},
	};

	const formGroupBuilder = useForm(
		new FormGroup({
			stageId: new FormControl(stageId, requiredValidator(errorMessages.stage.required)),
			renameVersion: new FormControl(
				renameVersion,
				requiredValidator(errorMessages.version.required),
				minLengthValidator(
					options.version.minLength,
					errorMessages.version.minLength.replace('%s', options.version.minLength)
				),
				maxLengthValidator(
					options.version.maxLength,
					errorMessages.version.maxLength.replace('%s', options.version.maxLength)
				)
			),
			renameStage: new FormControl(
				'',
				requiredValidator(errorMessages.stage.required),
				minLengthValidator(
					options.stage.minLength,
					errorMessages.stage.minLength.replace('%s', options.stage.minLength)
				),
				maxLengthValidator(
					options.stage.maxLength,
					errorMessages.stage.maxLength.replace('%s', options.stage.maxLength)
				)
			),
			renameSubject: new FormControl(
				'',
				requiredValidator(errorMessages.subject.required),
				minLengthValidator(
					options.subject.minLength,
					errorMessages.subject.minLength.replace('%s', options.subject.minLength)
				),
				maxLengthValidator(
					options.subject.maxLength,
					errorMessages.subject.maxLength.replace('%s', options.subject.maxLength)
				)
			),
			currentStageApproval: new FormControl(false),

			subjectId: new FormControl(
				subjectId,
				requiredValidator(errorMessages.subject.required)
			),
			trainerId: new FormControl(trainerId, requiredValidator(errorMessages.stage.required)),
			startDate: new FormControl(stageStartDate),
			endDate: new FormControl(stageEndDate),
		})
	);
	const { isValid, controls } = formGroupBuilder;
	/**
	 * @param {Array} errors This is an array of stages.
	 * @returns {Array} Returns a new array to Options into Select Component.
	 */
	function getErrorList(errors) {
		return Object.values(errors).filter((error) => error !== null);
	}
	/**
	 * @param {Array} event This is a event.
	 */
	function handleStageChange(event) {
		const stageFound = stages.find((stage) => stage.key === event.target.value);
		controls.currentStageApproval.setValue(stageFound.approvalRequired);
		controls.renameStage.setValue(stageFound.text);
		controls.subjectId.setValue(null);
		controls.trainerId.setValue(null);
		controls.startDate.setValue(new Date(stageFound.endDate));
		controls.endDate.setValue(new Date(stageFound.startDate));
		controls.renameVersion.setValue(programVersionRename);
	}
	/**
	 * @param {Array} event This is a event.
	 */
	function handleSubjectChange(event) {
		const currentStage = stages.find((stage) =>
			stage.subjects.some((s) => s.key === event.target.value)
		);
		const { userId } = currentStage.subjects.find(
			(subject) => subject.key === event.target.value
		);
		onSubjectChange(event.target.value);
		const subjectValue = getSubjectValue(event.target.value);
		controls.renameSubject.setValue(subjectValue);
		controls.trainerId.setValue(userId);
	}

	/**
	 * @param {Array} subjectId This is id of a subject.
	 * @returns {Array} return a name of subject.
	 */
	function getSubjectValue(subjectId) {
		const subjects =
			stages.find((stage) => stage.key === controls.stageId.value)?.subjects || [];

		const subject = subjects.find((subject) => subject.key === subjectId);
		return subject ? subject.text : '';
	}
	return (
		<>
			<div className={'program-version-header'}>
				<p className={'title'}>{`Program Version Update ${programVersionRename}`}</p>
				<p className={'description'}>{eventFormAction.description}</p>
			</div>
			<div className='program-version-form'>
				<Form as={SForm} onSubmit={onSubmit} formGroupBuilder={formGroupBuilder}>
					<SForm.Group widths='equal' key='form-group-id'>
						<Field
							key='stageId'
							as={SelectAdapter}
							formControlName='stageId'
							label={
								<div className={'form-label'}>
									{eventForm.fields.stage.label}
									<RequiredDot />
								</div>
							}
							placeholder={eventForm.fields.stage.placeholder}
							options={stages || []}
							onChange={handleStageChange}
							error={controls.stageId.hasErrors() && controls.stageId.dirty}
						/>
						{controls.stageId.value && (
							<Field
								key='currentStageApproval'
								as={(props) => (
									<>
										<div
											key='checkbox-container'
											className='checkbox-container'
										>
											<div>{props.label}</div>
											<div className='checkbox'>
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
								formControlName='currentStageApproval'
								label={<div className={''}>Current Stage Approval</div>}
								error={controls.subjectId.hasErrors() && controls.subjectId.dirty}
							/>
						)}
					</SForm.Group>

					<SForm.Group widths='equal' key='form-group-selectors'>
						<Field
							key='subjectId'
							as={SelectAdapter}
							formControlName='subjectId'
							label={
								<div className={'form-label'}>
									{eventForm.fields.subject.label}
									<RequiredDot />
								</div>
							}
							placeholder={eventForm.fields.subject.placeholder}
							options={
								stages.find((stage) => stage.key === controls.stageId.value)
									?.subjects || []
							}
							onChange={handleSubjectChange}
							error={controls.subjectId.hasErrors() && controls.subjectId.dirty}
						/>
						<Field
							key='trainerId'
							as={SelectAdapter}
							formControlName='trainerId'
							label={
								<div className={'form-label'}>
									{eventForm.fields.trainer.label}
									<RequiredDot />
								</div>
							}
							placeholder={eventForm.fields.trainer.placeholder}
							options={trainers}
							error={controls.subjectId.hasErrors() && controls.subjectId.dirty}
						/>
					</SForm.Group>
					{controls.stageId.value && (
						<>
							<Field
								key='renameVersion'
								as={SForm.Input}
								formControlName='renameVersion'
								label={
									<div className={'form-label'}>
										Rename Version
										<RequiredDot />
									</div>
								}
								placeholder={'Rename the ProgramVersion...'}
								error={
									controls.renameVersion.hasErrors() &&
									controls.renameVersion.dirty
								}
							/>
							<Message
								key='message-renameVersion'
								error
								visible
								hidden={
									!(
										controls.renameVersion.hasErrors() &&
										controls.renameVersion.dirty
									)
								}
								header={eventForm.messageError.header}
								list={getErrorList(controls.renameVersion.errors)}
							/>
						</>
					)}
					{controls.stageId.value && (
						<>
							<Field
								key='renameStage'
								as={SForm.Input}
								formControlName='renameStage'
								label={
									<div className={'form-label'}>
										Rename Stage
										<RequiredDot />
									</div>
								}
								placeholder={'Rename the stage...'}
								error={
									controls.renameStage.hasErrors() && controls.renameStage.dirty
								}
							/>
							<Message
								key='message-renameStage'
								error
								visible
								hidden={
									!(
										controls.renameStage.hasErrors() &&
										controls.renameStage.dirty
									)
								}
								header={eventForm.messageError.header}
								list={getErrorList(controls.renameStage.errors)}
							/>
						</>
					)}
					{controls.subjectId.value && (
						<>
							<Field
								key='renameSubject'
								as={SForm.Input}
								formControlName='renameSubject'
								label={
									<div className={'form-label'}>
										Rename Subject
										<RequiredDot />
									</div>
								}
								placeholder={'Rename the subject...'}
								error={
									controls.renameSubject.hasErrors() &&
									controls.renameSubject.dirty
								}
							/>
							<Message
								key='message-renameSubject'
								error
								visible
								hidden={
									!(
										controls.renameSubject.hasErrors() &&
										controls.renameSubject.dirty
									)
								}
								header={eventForm.messageError.header}
								list={getErrorList(controls.renameSubject.errors)}
							/>
						</>
					)}
					<SForm.Group widths='equal' key='form-group-dates'>
						{controls.stageId.value && (
							<Field
								key='startDate'
								as={(props) => (
									<>
										<div className='field-date-container'>
											<div>{props.label}</div>
											<div className='form-label-date'>
												<DatePicker
													selected={controls.startDate.value}
													onChange={(date) => {
														props.onChange({
															target: {
																name: props.name,
																value: date,
															},
														});
													}}
													startDate={controls.startDate.value}
													endDate={controls.endDate.value}
													maxDate={controls.endDate.value}
													peekNextMonth
													showMonthDropdown
													showYearDropdown
													dropdownMode='select'
													filterDate={isWeekday}
												/>
											</div>
										</div>
									</>
								)}
								formControlName='startDate'
								label={<div className={''}>StartDateStage</div>}
								placeholder='Please enter the start date...'
							/>
						)}
						{controls.stageId.value && (
							<>
								<Field
									key='endDate'
									as={(props) => (
										<>
											<div className='field-date-container'>
												<div className='form-label'>{props.label}</div>
												<div className='form-label-date'>
													<DatePicker
														selected={controls.endDate.value}
														onChange={(date) => {
															props.onChange({
																target: {
																	name: props.name,
																	value: date,
																},
															});
														}}
														startDate={controls.startDate.value}
														endDate={controls.endDate.value}
														minDate={controls.startDate.value}
														peekNextMonth
														showMonthDropdown
														showYearDropdown
														dropdownMode='select'
														filterDate={isWeekday}
													/>
												</div>
											</div>
										</>
									)}
									formControlName='endDate'
									label={<div className={'form-label-date'}>EndDateStage</div>}
									placeholder='Please enter the start date...'
								/>
								<Message
									key='message-enDate'
									error
									visible
									hidden={
										!(controls.endDate.hasErrors() && controls.endDate.dirty)
									}
									header={eventForm.messageError.header}
									list={getErrorList(controls.endDate.errors)}
								/>
							</>
						)}
					</SForm.Group>

					<SButton.Group key='button-group' className='btn-group' floated='right'>
						<SButton
							key='button-cancel'
							basic
							onClick={onCancel}
							content={eventForm.cancel}
						/>
						<SButton
							key='button-submit'
							primary
							disabled={!isValid()}
							type='submit'
							content={eventForm.save}
						/>
					</SButton.Group>
				</Form>
			</div>
		</>
	);
}

ProgramVersionsForm.propTypes = {
	trainerId: PropTypes.oneOfType([string, number]),
	stageId: PropTypes.oneOfType([string, number]),
	subjectId: PropTypes.oneOfType([string, number]),
	programVersionRename: string,
	renameVersion: string,
	label: string,
	name: string,
	title: string,
	value: object,
	startDate: string,
	endDate: string,
	stageEndDate: string,
	stageStartDate: string,
	description: string,
	onCancel: func,
	onSubmit: func,
	stages: array,
	eventForm: object,
	errorMessages: object,
	eventFormAction: object,
	onChange: PropTypes.func,
	onSubjectChange: PropTypes.func,
	trainers: PropTypes.array,
};

ProgramVersionsForm.defaultProps = {
	onCancel: Noop,
	onSubmit: Noop,
	stages: [],
	trainers: [],
	onSubjectChange: Noop,
};
