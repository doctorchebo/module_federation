import React from 'react';
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
import { isEmpty } from 'helpers/validators';
import RequiredDot from 'components/requiredDot';
import Message from 'components/message';
import PropTypes from 'prop-types';
import Noop from 'helpers/Noop';
import './index.css';

/**
 * Form to change scholar program
 *
 * @param {object} properties - Component properties
 * @returns {React.Component} - Scholar program form component
 */
export default function ScholarProgramForm(properties) {
	const { scholar, value, form, programs } = properties;
	const { onCancel, onSubmit } = properties;

	const { errorMessages, validator, fields, save, cancel } = form;

	const formGroupBuilder = useForm(
		new FormGroup({
			programId: new FormControl(
				value.programId,
				requiredValidator(errorMessages.programs.required)
			),
			description: new FormControl(
				value.description,
				requiredValidator(errorMessages.description.required),
				minLengthValidator(
					validator.description.minLength,
					errorMessages.description.minLength.replace(
						'%s',
						validator.description.minLength
					)
				),
				maxLengthValidator(
					validator.description.maxLength,
					errorMessages.description.maxLength.replace(
						'%s',
						validator.description.maxLength
					)
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

	return (
		<>
			<div className={'program-header'}>
				<p className={'title'}>Program change for {scholar.User}</p>
			</div>
			<div className='program-form'>
				<Form
					as={SForm}
					loading={isEmpty(programs.length)}
					onSubmit={onSubmit}
					formGroupBuilder={formGroupBuilder}
				>
					<Field
						key='programId'
						as={SelectAdapter}
						formControlName='programId'
						label={
							<div className={'form-label'}>
								{fields.programs.label}
								<RequiredDot />
							</div>
						}
						placeholder={fields.programs.placeholder}
						options={programs || []}
						error={controls.programId.hasErrors() && controls.programId.dirty}
					/>
					<Message
						key='message-programId'
						error
						visible
						hidden={!(controls.programId.hasErrors() && controls.programId.dirty)}
						header={errorMessages.main}
						list={getErrorList(controls.programId.errors)}
					/>
					<Field
						key='description'
						className='description'
						as={SForm.TextArea}
						formControlName='description'
						label={
							<div className={'form-label'}>
								{fields.description.label}
								<RequiredDot />
							</div>
						}
						placeholder={fields.description.placeholder}
						error={controls.description.hasErrors() && controls.description.dirty}
					/>
					<Message
						key='message-description'
						error
						visible
						hidden={!(controls.description.hasErrors() && controls.description.dirty)}
						header={errorMessages.main}
						list={getErrorList(controls.description.errors)}
					/>
					<SButton.Group key='button-group' className='btn-group' floated='right'>
						<SButton key='button-cancel' basic onClick={onCancel} content={cancel} />
						<SButton
							key='button-submit'
							primary
							disabled={!isValid()}
							type='submit'
							content={save}
						/>
					</SButton.Group>
				</Form>
			</div>
		</>
	);
}

ScholarProgramForm.propTypes = {
	scholar: PropTypes.object,
	value: PropTypes.object,
	form: PropTypes.object,
	programs: PropTypes.array,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};

ScholarProgramForm.defaultProps = {
	scholar: {},
	value: { programId: '', description: '' },
	form: {
		errorMessages: {
			main: '',
			programs: { required: 'Select a program is required' },
			description: {
				required: 'Description is requireed',
				minLength: 'Description must have at least %s characters',
				maxLength: 'Description must not have more than %s characters',
			},
		},
		validator: { description: { minLength: 2, maxLength: 255 } },
		fields: {
			programs: { label: '', placeholder: '' },
			description: { label: '', placeholder: '' },
		},
		save: '',
		cancel: '',
	},
	programs: [],
	onCancel: Noop,
	onSubmit: Noop,
};
