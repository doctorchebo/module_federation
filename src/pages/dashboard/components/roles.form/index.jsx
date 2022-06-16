import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { bool, func, object, string } from 'prop-types';
import Button from 'components/button';
import Grid from 'components/grid';
import locale from 'pages/dashboard/locale/en.json';
import Message from 'components/message';
import Noop from 'helpers/Noop';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	FieldComponent as Field,
	minLengthValidator,
	maxLengthValidator,
} from 'hooks/useForm';
import RequiredDot from 'components/requiredDot';
import SForm from 'components/form';
import PermissionsTable from 'pages/dashboard/components/permissions.table';
import './styles.css';

const MIN_LENGTH_DESCRIPTION = 2;
const MAX_LENGTH_DESCRIPTION = 255;
const MIN_LENGTH_NAME = 2;
const MAX_LENGTH_NAME = 255;

/**
 * Form to create or update a role.
 *
 * @param {object} properties Component properties
 * @returns {React.Component} Roles form component
 */
export default function RolesForm(properties) {
	const { value: model, title, loading } = properties;
	const { onSubmit } = properties;

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const formGroupBuilder = useForm(
		new FormGroup({
			name: new FormControl(
				model.name,
				requiredValidator(locale.roleForm.errorMessages.name.required),
				minLengthValidator(
					MIN_LENGTH_NAME,
					locale.roleForm.errorMessages.name.minLength.replace('%s', MIN_LENGTH_NAME)
				),
				maxLengthValidator(
					MAX_LENGTH_NAME,
					locale.roleForm.errorMessages.name.maxLength.replace('%s', MAX_LENGTH_NAME)
				)
			),
			description: new FormControl(
				model.description,
				requiredValidator(locale.roleForm.errorMessages.description.required),
				minLengthValidator(
					MIN_LENGTH_DESCRIPTION,
					locale.roleForm.errorMessages.description.minLength.replace(
						'%s',
						MIN_LENGTH_DESCRIPTION
					)
				),
				maxLengthValidator(
					MAX_LENGTH_DESCRIPTION,
					locale.roleForm.errorMessages.description.maxLength.replace(
						'%s',
						MAX_LENGTH_DESCRIPTION
					)
				)
			),
			permissions: new FormControl(model.permissions),
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
		<>
			<div className='roles form'>
				<header className='section-header'>
					<span className='title'>{title}</span>
				</header>

				<section>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row'>
								<Grid.Column key='row-colum-fields' width='6'>
									<Field
										key='name'
										as={SForm.Input}
										formControlName='name'
										label={
											<div className='form-label'>
												{locale.roleForm.fields.name.label}
												<RequiredDot />
											</div>
										}
										placeholder={locale.roleForm.fields.name.placeholder}
										error={showErrorOfField(controls.name)}
									/>
									<Message
										key='message-name'
										error
										visible
										hidden={!showErrorOfField(controls.name)}
										header={locale.roleForm.messageError.header}
										list={getErrorList(controls.name.errors)}
									/>
									<Field
										key='description'
										as={SForm.TextArea}
										formControlName='description'
										label={
											<div className='form-label'>
												{locale.roleForm.fields.description.label}
												<RequiredDot />
											</div>
										}
										placeholder={locale.roleForm.fields.description.placeholder}
										error={showErrorOfField(controls.description)}
									/>
									<Message
										key='message-description'
										error
										visible
										hidden={!showErrorOfField(controls.description)}
										header={locale.roleForm.messageError.header}
										list={getErrorList(controls.description.errors)}
									/>
								</Grid.Column>
								<Grid.Column key='row-colum-permissions' width='10'>
									<PermissionsTable
										value={controls.permissions.value || []}
										onChange={(value) => {
											forceUpdate(value);
										}}
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
								to='/dashboard/roles'
							>
								{locale.roleForm.cancel}
							</Button>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.roleForm.save}
								disabled={!isValid()}
								loading={loading}
							/>
						</div>
					</Form>
				</section>
			</div>
		</>
	);
}

RolesForm.propTypes = {
	value: object,
	title: string,
	loading: bool,
	onSubmit: func,
};

RolesForm.defaultProps = {
	value: {
		name: '',
		description: '',
		permissions: [],
	},
	title: '',
	loading: false,
	onSubmit: Noop,
};
