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
import { array, func, number, object, string } from 'prop-types';
import Message from 'components/message';
import './styles.css';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';

/**
 * This function returns an status Form Component.
 *
 * @param {props} props Properties.
 * @returns {ElementType} Return an Element Type.
 */
export default function StatusFormComponent(props) {
	const { errorMessages, statusForm, statusFormAction, scholar } = props;
	const { description, statusTypes, statusId } = props;
	const { onCancel, onSubmit } = props;
	const userName = scholar.person ? scholar.person.fullName : scholar.User;

	const minLengthDescription = 10;
	const maxLengthDescription = 255;

	const formGroupBuilder = useForm(
		new FormGroup({
			statusId: new FormControl(
				statusId,
				requiredValidator(errorMessages.statusType.required)
			),
			description: new FormControl(
				description,
				requiredValidator(errorMessages.description.required),
				minLengthValidator(
					minLengthDescription,
					errorMessages.description.minLength.replace('%s', minLengthDescription)
				),
				maxLengthValidator(
					maxLengthDescription,
					errorMessages.description.maxLength.replace('%s', maxLengthDescription)
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

	const hasErrorsOrDirty = controls.description.hasErrors() && controls.description.dirty;

	return (
		<>
			<div className={'event-header'}>
				<p className={'title'}>{statusFormAction.title.replace('%s', userName)}</p>
				<p className={'description'}>{statusFormAction.description}</p>
			</div>
			<div className='event-form'>
				<Form
					as={SForm}
					loading={statusTypes.length === 0}
					onSubmit={onSubmit}
					formGroupBuilder={formGroupBuilder}
				>
					<Field
						as={SelectAdapter}
						formControlName='statusId'
						label={
							<div className={'form-label'}>
								{statusForm.fields.status.label}
								<RequiredDot />
							</div>
						}
						placeholder={statusForm.fields.description.placeholder}
						options={statusTypes}
						disabled={statusTypes.length === 1}
					/>

					<Field
						as={SForm.TextArea}
						formControlName='description'
						label={
							<div className={'form-label'}>
								{statusForm.fields.description.label}
								<RequiredDot />
							</div>
						}
						placeholder={statusForm.fields.description.placeholder}
						error={hasErrorsOrDirty}
					/>
					<Message
						error
						visible
						hidden={!hasErrorsOrDirty}
						header={statusForm.messageError.header}
						list={getErrorList(controls.description.errors)}
					/>

					<SButton.Group className='btn-group' floated='right' widths='equal'>
						<SButton basic onClick={onCancel} content={statusForm.cancel} />
						<SButton
							primary
							disabled={!isValid()}
							type='submit'
							content={statusForm.save}
						/>
					</SButton.Group>
				</Form>
			</div>
		</>
	);
}

StatusFormComponent.propTypes = {
	description: string,
	onCancel: func,
	onSubmit: func,
	statusId: number | string,
	statusTypes: array,
	statusForm: object,
	statusFormAction: object,
	errorMessages: object,
	scholar: object,
	historyStatus: object,
};

StatusFormComponent.defaultProps = {
	onCancel: Noop,
	onSubmit: Noop,
	statusTypes: [],
};
