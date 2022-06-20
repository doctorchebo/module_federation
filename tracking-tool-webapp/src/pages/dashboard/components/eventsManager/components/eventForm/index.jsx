import React, { ElementType, useMemo, useEffect } from 'react';
import { Form as SForm, Button as SButton, Icon } from 'semantic-ui-react';
import PropTypes, { array, func, number, object, string } from 'prop-types';
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
import Message from 'components/message';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';
import { isEmpty } from 'helpers/validators';
import { debounce } from 'lodash';
import RichTextEditor from 'components/richText';
import './styles.css';

/**
 * This function returns an Event Form Component.
 *
 * @param {props} props Properties.
 * @returns {ElementType} Return an Element Type.
 */
export default function EventFormComponent(props) {
	const {
		errorMessages,
		eventForm,
		eventFormAction,
		scholar,
		eventTypeId,
		stageId,
		subjectId,
		title,
		description,
		notificationUsers,
		notifyTo,
		eventTypes,
		stages,
		onAttach,
		onShare,
		onChangeUsersToNotify,
		onGetSelectedUsers,
	} = props;
	const { onCancel, onSubmit } = props;
	const userName = scholar.person ? scholar.person.fullName : scholar.User;
	const options = {
		title: {
			minLength: 5,
			maxLength: 30,
		},
		description: {
			minLength: 142,
			showMinLength: 10,
		},
	};
	const formGroupBuilder = useForm(
		new FormGroup({
			notifyTo: new FormControl(notifyTo),
			eventTypeId: new FormControl(
				eventTypeId,
				requiredValidator(errorMessages.eventType.required)
			),
			stageId: new FormControl(stageId, requiredValidator(errorMessages.stage.required)),
			subjectId: new FormControl(
				subjectId,
				requiredValidator(errorMessages.subject.required)
			),
			title: new FormControl(
				title,
				requiredValidator(errorMessages.title.required),
				minLengthValidator(
					options.title.minLength,
					errorMessages.title.minLength.replace('%s', options.title.minLength)
				),
				maxLengthValidator(
					options.title.maxLength,
					errorMessages.title.maxLength.replace('%s', options.title.maxLength)
				)
			),
			description: new FormControl(
				description,
				requiredValidator(errorMessages.description.required),
				minLengthValidator(
					options.description.minLength,
					errorMessages.description.minLength.replace(
						'%s',
						options.description.showMinLength
					)
				)
			),
		})
	);

	const { isValid, controls, value } = formGroupBuilder;

	/**
	 * To share a backup of event form values on the global context
	 */
	useEffect(() => {
		onShare(value);
	}, [value]);

	/**
	 * This function receive the event, when the user type its search by name
	 *
	 * @param {Event} event Event.
	 */
	function onChangeUsers(event) {
		onChangeUsersToNotify({ criteria: event.target.value });
	}

	const debouncedChangeUsersToNotify = useMemo(() => debounce(onChangeUsers, 300), []);
	/**
	 * This function receive the event, when the user select or delete an user
	 *
	 * @param {Event} event Event.
	 */
	function onSelectUser(event) {
		onGetSelectedUsers(event.target.value);
	}

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
	 *	Reset the value of subject field.
	 *
	 * @param {Event} event Event.
	 */
	function resetSubject(event) {
		controls.subjectId.setValue(null);
	}
	return (
		<>
			<div className={'event-header'}>
				<p className={'title'}>{eventFormAction.title.replace('%s', userName)}</p>
				<p className={'description'}>{eventFormAction.description}</p>
			</div>
			<div className='event-form'>
				<Form
					as={SForm}
					loading={
						isEmpty(eventTypes.length) &&
						isEmpty(stages.length) &&
						isEmpty(notifyTo.length)
					}
					onSubmit={onSubmit}
					formGroupBuilder={formGroupBuilder}
				>
					{eventFormAction.type === 'create' && (
						<Field
							key='notifyTo'
							as={SelectAdapter}
							formControlName='notifyTo'
							label={
								<div className={'form-label'}>
									{eventForm.fields.notifyTo.label}
								</div>
							}
							placeholder={eventForm.fields.notifyTo.placeholder}
							options={notificationUsers || []}
							error={controls.notifyTo.hasErrors() && controls.notifyTo.dirty}
							multiple
							search
							selection
							fluid
							renderLabel={(option) => {
								return {
									content: option.text,
									name: option.name,
									value: option.value,
								};
							}}
							onChange={onSelectUser}
							onSearchChange={debouncedChangeUsersToNotify}
						/>
					)}
					<Field
						key='eventTypeId'
						as={SelectAdapter}
						formControlName='eventTypeId'
						label={
							<div className={'form-label'}>
								{eventForm.fields.eventType.label}
								<RequiredDot />
							</div>
						}
						placeholder={eventForm.fields.eventType.placeholder}
						options={eventTypes || []}
						error={controls.eventTypeId.hasErrors() && controls.eventTypeId.dirty}
					/>
					<Message
						key='message-eventTypeId'
						error
						visible
						hidden={!(controls.eventTypeId.hasErrors() && controls.eventTypeId.dirty)}
						header={eventForm.messageError.header}
						list={getErrorList(controls.eventTypeId.errors)}
					/>
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
							onChange={resetSubject}
							error={controls.stageId.hasErrors() && controls.stageId.dirty}
						/>

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
							error={controls.subjectId.hasErrors() && controls.subjectId.dirty}
						/>
					</SForm.Group>
					<Field
						key='title'
						as={SForm.Input}
						formControlName='title'
						label={
							<div className={'form-label'}>
								{eventForm.fields.title.label}
								<RequiredDot />
							</div>
						}
						placeholder={eventForm.fields.title.placeholder}
						error={controls.title.hasErrors() && controls.title.dirty}
					/>
					<Message
						key='message-title'
						error
						visible
						hidden={!(controls.title.hasErrors() && controls.title.dirty)}
						header={eventForm.messageError.header}
						list={getErrorList(controls.title.errors)}
					/>
					<Field
						key='description'
						className='description'
						as={RichTextEditor}
						formControlName='description'
						label={
							<div className='label'>
								<div className={'form-label'}>
									{eventForm.fields.description.label}
									<RequiredDot />
								</div>
								<SButton icon onClick={onAttach}>
									<Icon name='attach' />
								</SButton>
							</div>
						}
						placeholder={eventForm.fields.description.placeholder}
						error={controls.description.hasErrors() && controls.description.dirty}
					/>
					<Message
						key='message-description'
						error
						visible
						hidden={!(controls.description.hasErrors() && controls.description.dirty)}
						header={eventForm.messageError.header}
						list={getErrorList(controls.description.errors)}
					/>
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

EventFormComponent.propTypes = {
	eventTypeId: PropTypes.oneOfType([string, number]),
	stageId: PropTypes.oneOfType([string, number]),
	subjectId: PropTypes.oneOfType([string, number]),
	title: string,
	description: string,
	onCancel: func,
	onSubmit: func,
	eventTypes: array,
	stages: array,
	eventForm: object,
	errorMessages: object,
	eventFormAction: object,
	scholar: object,
	onAttach: func,
	onShare: func,
	onChangeUsersToNotify: func,
	onGetSelectedUsers: func,
	notifyTo: array,
	notificationUsers: array,
};

EventFormComponent.defaultProps = {
	onCancel: Noop,
	onSubmit: Noop,
	eventTypes: [],
	stages: [],
	notificationUsers: [],
	notifyTo: [],
	title: '',
	description: '',
};
