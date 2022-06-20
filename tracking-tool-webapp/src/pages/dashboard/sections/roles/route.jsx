import NotFound from 'components/notFound';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateRole from '../../views/roles.create';
import BulkEditView from '../../views/roles.bulk';
import RolesMainView from 'pages/dashboard/views/roles.main';
import UpdateView from './views/UpdateView';

/**
 * Routes of roles section
 *
 * @param {object} properties Properties.
 * @returns {React.Component} -
 */
export default function Routes(properties) {
	const { path } = properties;
	return (
		<Switch>
			<Route exact path={`${path}/`} component={RolesMainView} />
			<Route exact path={`${path}/add`} component={CreateRole} />
			<Route exact path={`${path}/edit`} component={BulkEditView} />
			<Route exact path={`${path}/:roleId/edit`} component={UpdateView} />
			<Route path='*' component={NotFound} />
		</Switch>
	);
}
