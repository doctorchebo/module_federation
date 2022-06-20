import React from 'react';
import Grid from 'components/grid';
import { List } from 'semantic-ui-react';
import { object } from 'prop-types';
import locale from 'pages/dashboard/locale/en.json';
import { normalizePermissionsUpdateRole } from 'pages/dashboard/helpers/normalize';
import './styles.css';

/**
 * @param {object} properties Properties
 * @returns {React.Component} - renders the RolesDetails component
 */
export default function RolesDetails(properties) {
	const { value: role } = properties;
	const currentRole = {
		name: role.name,
		description: role.description,
		permissions: normalizePermissionsUpdateRole(role.actions, role.id),
	};
	const textSeparator = ' - ';
	const permissionSummary = (permission) => {
		let summary = '';
		if (
			!permission.canView &&
			!permission.canAdd &&
			!permission.canEdit &&
			!permission.canDelete
		) {
			summary = locale.roleForm.noAccess;
		} else {
			if (permission.canView) {
				summary = summary.concat(locale.roleForm.canView);
			}
			if (permission.canAdd) {
				summary = summary.concat(textSeparator, locale.roleForm.canAdd);
			}
			if (permission.canEdit) {
				summary = summary.concat(textSeparator, locale.roleForm.canEdit);
			}
			if (permission.canDelete) {
				summary = summary.concat(textSeparator, locale.roleForm.canDelete);
			}
		}
		return summary;
	};
	return (
		<>
			<div className='roles details' key='roles details'>
				<header className='section-header'>
					<span className='title'>{role.name}</span>
				</header>
				<section>
					<Grid divided relaxed key='grid'>
						<Grid.Column className='description' key='row-colum-header' width='4'>
							{role.description}
						</Grid.Column>
						<Grid.Column key='row-colum-body' width='12'>
							<div key='permissions-title-label' className='permissions-label'>
								{locale.roleForm.permissionsTitle}
							</div>
							<Grid.Row key='grid-row-list'>
								<List divided relaxed horizontal list className='permission-list'>
									{currentRole.permissions &&
										currentRole.permissions.map((permission, index) => {
											return (
												<List.Item key={index}>
													<List.Content key={permission.name}>
														<List.Header>{permission.name}</List.Header>
														<List.Description className='list-desc'>
															{permissionSummary(permission)}
														</List.Description>
													</List.Content>
												</List.Item>
											);
										})}
								</List>
							</Grid.Row>
							<Grid.Row key='grid-row' className='users'>
								<span className='label'>{locale.roles.users.concat(':')}</span>
								<span className='number'>-</span>
							</Grid.Row>
						</Grid.Column>
					</Grid>
				</section>
			</div>
		</>
	);
}

RolesDetails.propTypes = {
	value: object.isRequired,
};

RolesDetails.defaultProps = {
	value: {
		name: '',
		description: '',
		permissions: [],
	},
};
