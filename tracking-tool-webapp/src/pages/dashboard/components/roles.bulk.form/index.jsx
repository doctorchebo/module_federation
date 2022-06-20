import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PermissionsTable from '../permissions.table';
import RolesSelector from '../roles.selector';
import useForm, { FormGroup, FormControl, FormComponent as Form } from 'hooks/useForm';
import Grid from 'components/grid';
import Button from 'components/button';
import SForm from 'components/form';
import locale from '../../locale/en.json';
import Noop from 'helpers/Noop';
import './index.css';

/**
 * Returns a Bulk Edit Form Component.
 *
 * @param {object} props - properties
 * @returns {React.Component} - Form component
 */
export default function RolesBulkForm(props) {
	const { items, value: model, title, loading, selected, onSelectRole, onSubmit } = props;

	const formGroupBuilder = useForm(
		new FormGroup({
			idsOfRoles: new FormControl(model.idsOfRoles),
			actions: new FormControl(model.permissions),
		})
	);

	const { controls } = formGroupBuilder;

	const validatorSelect = (value) => {
		onSelectRole(value);
	};

	return (
		<>
			<div className='bulk-form'>
				<header className='section-header'>
					<span className='title'>{title}</span>
				</header>

				<section>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row'>
								<Grid.Column
									key='row-colum-roles-selector'
									className='role-selector-container'
									width='6'
								>
									<RolesSelector
										items={items}
										value={controls.idsOfRoles.value}
										onSelect={validatorSelect}
									/>
								</Grid.Column>
								<Grid.Column
									key='row-colum-permissions'
									className='permissions-container'
									width='10'
								>
									<PermissionsTable
										value={controls.actions.value}
										onChange={useReducer((bool) => !bool)[1]}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<div key='buttons-role' className='button-group'>
							<Button
								key='button-back'
								as={Link}
								compact
								content={locale.roles.bulkEditForm.cancel}
								className='button-back'
								to='/dashboard/roles'
							/>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.roles.bulkEditForm.save}
								disabled={!selected}
								loading={loading}
							/>
						</div>
					</Form>
				</section>
			</div>
		</>
	);
}

RolesBulkForm.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired,
	value: PropTypes.shape({
		idsOfRoles: PropTypes.array.isRequired,
		permissions: PropTypes.array.isRequired,
	}),
	loading: PropTypes.bool,
	selected: PropTypes.bool,
	onSelectRole: PropTypes.func,
	onSubmit: PropTypes.func,
};

RolesBulkForm.defaultProps = {
	title: '',
	items: [],
	value: {
		idsOfRoles: [],
		permissions: [],
	},
	loading: false,
	selected: false,
	onSelectRole: Noop,
	onSubmit: Noop,
};
