import React, { useState } from 'react';
import { Form as SForm, Button as SButton, Checkbox } from 'semantic-ui-react';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	FieldComponent as Field,
	minLengthValidator,
} from 'hooks/useForm';
import SelectAdapter from 'components/form/selectAdapter';
import PropTypes, { array, bool, func, number, object, string } from 'prop-types';
import Message from 'components/message';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';
import { isEmpty } from 'helpers/validators';
import RichTextEditor from 'components/richText';
import '../styles.css';

/**
 * @param {Array} props all headers
 * @returns {React.Component} table header component
 */
export default function SubjectEvaluationForm(props) {
	const { value: model, errorMessages, eventForm, eventTypes, onCancel, isPublished } = props;
	const { onSubmit } = props;
	const options = {
		comment: {
			minLength: 10,
		},
	};
	const formGroupBuilder = useForm(
		new FormGroup({
			gradeId: new FormControl(model.grade, requiredValidator(errorMessages.grade.required)),
			comment: new FormControl(
				model.comment,
				requiredValidator(errorMessages.comment.required),
				minLengthValidator(
					options.comment.minLength,
					errorMessages.comment.minLength.replace('%s', options.comment.minLength)
				)
			),
			isPublished: new FormControl(isPublished),
		})
	);

	const { isValid, controls } = formGroupBuilder;
	const [atPosted, setAtPosted] = useState(false);
	const gradeControl = controls.gradeId;
	const commentControl = controls.comment;

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
		<>
			<div className='event-form'>
				<Form
					as={SForm}
					loading={isEmpty(eventTypes.length)}
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
						options={eventTypes || []}
						error={gradeControl.hasErrors() && gradeControl.dirty}
					/>
					<Message
						key='message-grade'
						error
						visible
						hidden={!(gradeControl.hasErrors() && gradeControl.dirty)}
						header={eventForm.messageError.header}
						list={getErrorList(gradeControl.errors)}
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
						error={commentControl.hasErrors() && commentControl.dirty}
					/>
					<Message
						key='message-comment'
						error
						visible
						hidden={!(commentControl.hasErrors() && commentControl.dirty)}
						header={eventForm.messageError.header}
						list={getErrorList(commentControl.errors)}
					/>
					<Field
						key='isPublished'
						as={(propss) => (
							<>
								<div className='field-toogle-container' style={{ width: '100%' }}>
									<div className='public'>
										<Checkbox
											className='public'
											toggle
											label='Posted'
											onChange={(e, atPosted) => {
												setAtPosted(atPosted.checked);
												propss.onChange({
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
							</>
						)}
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
		</>
	);
}
SubjectEvaluationForm.propTypes = {
	value: object,
	eventTypeId: PropTypes.oneOfType([string, number]),
	comment: string,
	onCancel: func,
	onSubmit: func,
	eventTypes: array,
	eventForm: object,
	errorMessages: object,
	eventFormAction: object,
	scholar: object,
	onChangeUsersToNotify: func,
	onGetSelectedUsers: func,
	isPublished: bool,
};

SubjectEvaluationForm.defaultProps = {
	value: {
		comment: '',
		grade: '',
	},
	onCancel: Noop,
	onSubmit: Noop,
	eventTypes: [],
	comment: '',
};
