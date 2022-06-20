import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { RolesDataProvider } from './context/rolesContext';
import Routes from './route';

/**
 * @returns {React.Component} -
 */
export default function Roles() {
	const { path } = useRouteMatch('/dashboard/roles');

	return (
		<RolesDataProvider>
			<Routes path={path} />
		</RolesDataProvider>
	);
}
