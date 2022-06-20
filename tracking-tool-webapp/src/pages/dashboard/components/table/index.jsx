import React from 'react';
import { Table, Dropdown, Segment } from 'semantic-ui-react';
import CustomTableHeader from 'components/customTableHeader';
import PropTypes from 'prop-types';
import useSort from 'hooks/useSort';
import { useApplication } from 'application/context/AppContext';
import UpdateUserForm from 'pages/dashboard/components/update.user.form';
import locale from 'pages/dashboard/sections/users/locale/en.json';
import normalizeUserToUpdate from 'pages/dashboard/sections/users/helpers/normalize';
import { ProfileProvider } from 'pages/profile/context';
import ProfilePicture from 'pages/profile/components/profilePicture';
import './styles.css';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function UsersTable(props) {
	const [, actions] = useApplication();
	const { userActions } = props;
	const users = props.users;
	const { sortedItems, requestSort, sortConfig } = useSort(users);
	const getClassNamesForSort = (name) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === name ? sortConfig.direction : undefined;
	};

	const handleUserEdit = (user) => {
		actions.onSidebarAddView({
			header: null,
			content: (
				<Segment basic padded className='form-container'>
					<UpdateUserForm
						value={user}
						title={locale.updateUserForm.update.title}
						actions={actions}
						roles={props.roles}
						onSubmit={(value) => {
							userActions.onUserUpdate(normalizeUserToUpdate(value));
							actions.onHideSidebar();
						}}
					/>
				</Segment>
			),
			footer: null,
		});
	};

	return (
		<Table className='table-user table-container'>
			<CustomTableHeader
				headers={locale.headers}
				requestSort={requestSort}
				getClassNamesForSort={getClassNamesForSort}
				backendSort={true}
				type={'users'}
			/>
			<Table.Body>
				{sortedItems &&
					sortedItems.map((user) => {
						return (
							<Table.Row key={user.id}>
								<Table.Cell>
									<ProfileProvider>
										<ProfilePicture userId={user.id} />
									</ProfileProvider>
									{user.firstName}
								</Table.Cell>
								<Table.Cell>{user.lastName}</Table.Cell>
								<Table.Cell>{user.roles[0].name}</Table.Cell>
								<Table.Cell>{user.email}</Table.Cell>
								<Table.Cell>{user.phoneNumber}</Table.Cell>
								<Table.Cell>{user.currentCity}</Table.Cell>
								<Table.Cell>{user.ci}</Table.Cell>
								<Table.Cell>
									<Dropdown icon='ellipsis vertical'>
										<Dropdown.Menu>
											<Dropdown.Item
												icon='edit'
												content='Edit'
												onClick={() => handleUserEdit(user)}
											/>
										</Dropdown.Menu>
									</Dropdown>
								</Table.Cell>
							</Table.Row>
						);
					})}
			</Table.Body>
		</Table>
	);
}

UsersTable.propTypes = {
	users: PropTypes.array,
	actions: PropTypes.any,
	roles: PropTypes.array,
	userActions: PropTypes.object,
};
