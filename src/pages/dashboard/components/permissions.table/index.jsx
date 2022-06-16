import React from 'react';
import { array } from 'prop-types';
import { Checkbox, Table } from 'semantic-ui-react';
import { sortingAscendingByName } from 'pages/dashboard/sections/roles/helpers/sorting';
import locale from 'pages/dashboard/locale/en.json';

/**
 * This function renders an Table of permissions.
 *
 * @param {object} properties Properties
 * @returns {React.Component} Return a React component
 */
export default function PermissionsTable(properties) {
	const { value: model, onChange } = properties;

	const handleAllChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		currentPermission.canView = true;
		currentPermission.canAdd = true;
		currentPermission.canEdit = true;
		currentPermission.canDelete = true;
		onChange();
	};
	const handleNoAccessChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		currentPermission.canView = false;
		currentPermission.canAdd = false;
		currentPermission.canEdit = false;
		currentPermission.canDelete = false;
		onChange();
	};
	const handleViewChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		if (model[permissionIndex].canView) {
			currentPermission.canView = false;
			currentPermission.canAdd = false;
			currentPermission.canEdit = false;
			currentPermission.canDelete = false;
		} else {
			currentPermission.canView = true;
		}
		onChange();
	};
	const handleAddChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		if (model[permissionIndex].canAdd) {
			currentPermission.canAdd = false;
			currentPermission.canEdit = false;
			currentPermission.canDelete = false;
		} else {
			currentPermission.canView = true;
			currentPermission.canAdd = true;
		}
		onChange();
	};
	const handleEditChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		if (model[permissionIndex].canEdit) {
			currentPermission.canEdit = false;
			currentPermission.canDelete = false;
		} else {
			currentPermission.canView = true;
			currentPermission.canAdd = true;
			currentPermission.canEdit = true;
		}
		onChange();
	};
	const handleDeleteChecked = (permissionIndex) => {
		let newPermissions = [...model];
		let currentPermission = newPermissions[permissionIndex];
		if (model[permissionIndex].canDelete) {
			currentPermission.canDelete = false;
		} else {
			currentPermission.canView = true;
			currentPermission.canAdd = true;
			currentPermission.canEdit = true;
			currentPermission.canDelete = true;
		}
		onChange();
	};

	return (
		<>
			<div key='permissions-title-label' className='form-label'>
				{locale.roleForm.permissionsTitle}
			</div>
			<Table key='permissions-table' className='permissions table' striped>
				<Table.Header key='permissions-table-header'>
					<Table.Row key='permissions-table-row-header' className='permission table'>
						<Table.HeaderCell key='table-header-permission'>
							{locale.roleForm.permission}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-none'>
							{locale.roleForm.noAccess}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-view'>
							{locale.roleForm.canView}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-add'>
							{locale.roleForm.canAdd}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-edit'>
							{locale.roleForm.canEdit}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-delete'>
							{locale.roleForm.canDelete}
						</Table.HeaderCell>
						<Table.HeaderCell key='table-header-all' className='celled'>
							{locale.roleForm.all}
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body key='permissions-table-body'>
					{model &&
						sortingAscendingByName(model) &&
						model.map((permission, index) => {
							return (
								<Table.Row key={index}>
									<Table.Cell key={permission.name}>
										<h4>{permission.name}</h4>
									</Table.Cell>
									<Table.Cell key={'No-access-' + index}>
										<Checkbox
											checked={
												!permission.canView &&
												!permission.canAdd &&
												!permission.canEdit &&
												!permission.canDelete
											}
											onChange={() => handleNoAccessChecked(index)}
										/>
									</Table.Cell>
									<Table.Cell key={'canView-' + index}>
										<Checkbox
											checked={permission.canView}
											onChange={() => handleViewChecked(index)}
										/>
									</Table.Cell>
									<Table.Cell key={'canAdd-' + index}>
										<Checkbox
											checked={permission.canAdd}
											onChange={() => handleAddChecked(index)}
										/>
									</Table.Cell>
									<Table.Cell key={'canEdit-' + index}>
										<Checkbox
											checked={permission.canEdit}
											onChange={() => handleEditChecked(index)}
										/>
									</Table.Cell>
									<Table.Cell key={'canDelete-' + index}>
										<Checkbox
											checked={permission.canDelete}
											onChange={() => handleDeleteChecked(index)}
										/>
									</Table.Cell>
									<Table.Cell className='celled' key={'all-' + index}>
										<Checkbox
											checked={
												permission.canView &&
												permission.canAdd &&
												permission.canEdit &&
												permission.canDelete
											}
											onChange={() => handleAllChecked(index)}
										/>
									</Table.Cell>
								</Table.Row>
							);
						})}
				</Table.Body>
			</Table>
		</>
	);
}

PermissionsTable.propTypes = {
	value: array.isRequired,
};

PermissionsTable.defaultProps = {
	value: [],
};
