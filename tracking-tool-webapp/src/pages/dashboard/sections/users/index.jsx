import React from 'react';
import MainView from 'pages/dashboard/views/users.main';
import { UsersDataProvider } from './context/usersContext';
import './index.css';
import { RolesDataProvider } from '../roles/context/rolesContext';

/**
 * @returns {React.Component} -
 */
export default function Users() {
	return (
		<UsersDataProvider>
			<RolesDataProvider>
				<MainView />
			</RolesDataProvider>
		</UsersDataProvider>
	);
}
