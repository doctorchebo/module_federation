import React, { ElementType, useState, useEffect } from 'react';
import { Form as SForm, Button as SButton, Checkbox } from 'semantic-ui-react';
import PropTypes, { array, func, number, object, string } from 'prop-types';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	FieldComponent as Field,
	minLengthValidator,
} from 'hooks/useForm';
import Message from 'components/message';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';
import RichTextEditor from 'components/richText';
import SelectAdapter from 'components/form/selectAdapter';
import { isEmpty } from 'helpers/validators';

/**
 * This function returns an Event Form Component.
 *
 * @param {props} props Properties.
 * @returns {ElementType} Return an Element Type.
 */
export default function EventFormComponent(props) {
	const { errorMessages, eventForm, onShare, gradeId, grades, comment, isPublished } = props;
	const { onCancel, onSubmit } = props;
	const options = {
		comment: {
			minLength: 10,
		},
	};

	const formGroupBuilder = useForm(
		new FormGroup({
			gradeId: new FormControl(gradeId, requiredValidator(errorMessages.grade.required)),
			comment: new FormControl(
				comment,
				requiredValidator(errorMessages.comment.required),
				minLengthValidator(
					options.comment.minLength,
					errorMessages.comment.minLength.replace('%s', options.comment.minLength)
				)
			),
			isPublished: new FormControl(isPublished),
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
	 * This function get an error list.
	 *
	 * @param {{string: any}} errors These are errors from a FormGroup.
	 * @returns {Array} Returns an array of errors.
	 */
	function getErrorList(errors) {
		return Object.values(errors).filter((error) => error !== null);
	}
	/**
	 *	Get the current post and then the value of the post is selected
	 */
	const [atPosted, setAtPosted] = useState(false);
	controls.isPublished.value = atPosted;

	/**
	 * @param {object} propsEvent information in the posted
	 * @returns {object} Returns an object of posted.
	 */
	function onChange(propsEvent) {
		return (
			<div className='field-toogle-container' style={{ width: '100%' }}>
				<div className='public'>
					<Checkbox
						className='public'
						toggle
						label='Posted'
						onChange={(e, atPosted) => {
							setAtPosted(atPosted.checked);
							propsEvent.onChange({
								target: {
									name: 'isPublished',
									value: atPosted.checked,
								},
							});
						}}
						checked={atPosted}
					/>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className='container-form-evaluate'>
				<div className='event-form'>
					<Form
						as={SForm}
						loading={isEmpty(grades.length)}
						onSubmit={onSubmit}
						formGroupBuilder={formGroupBuilder}
					>
						<Field
							style={{ width: '30%', minWidth: '30%' }}
							key='gradeId'
							as={SelectAdapter}
							formControlName='gradeId'
							label={
								<div className={'form-label'}>
									{eventForm.fields.grade.label}
									<RequiredDot />
								</div>
							}
							placeholder={eventForm.fields.grade.placeholder}
							options={grades || []}
							error={controls.gradeId.hasErrors() && controls.gradeId.dirty}
						/>
						<Message
							key='message-gradeId'
							error
							visible
							hidden={!(controls.gradeId.hasErrors() && controls.gradeId.dirty)}
							header={eventForm.messageError.header}
							list={getErrorList(controls.gradeId.errors)}
						/>
						<Field
							key='comment'
							as={RichTextEditor}
							formControlName='comment'
							label={
								<div className='label'>
									<div className={'form-label'}>
										{eventForm.fields.comment.label}
										<RequiredDot />
									</div>
								</div>
							}
							placeholder={eventForm.fields.comment.placeholder}
							error={controls.comment.hasErrors() && controls.comment.dirty}
						/>
						<Message
							key='message-comment'
							error
							visible
							hidden={!(controls.comment.hasErrors() && controls.comment.dirty)}
							header={eventForm.messageError.header}
							list={getErrorList(controls.comment.errors)}
						/>
						<Field
							key='isPublished'
							as={onChange}
							formControlName='isPublished'
							label={
								<div className={'form-label'}>
									{eventForm.fields.posted.label}
									<RequiredDot />
								</div>
							}
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
			</div>
		</>
	);
}

EventFormComponent.propTypes = {
	gradeId: PropTypes.oneOfType([string, number]),
	comment: string,
	onCancel: func,
	onSubmit: func,
	eventForm: object,
	errorMessages: object,
	eventFormAction: object,
	scholar: object,
	onShare: func,
	onGetSelectedUsers: func,
	gradeEvaluation: array,
	grades: array,
	onChange: func,
	isPublished: string,
};

EventFormComponent.defaultProps = {
	onCancel: Noop,
	onSubmit: Noop,
	gradeEvaluation: [],
	grades: [],
	comment: '',
};
