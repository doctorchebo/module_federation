import NotFound from 'components/notFound';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BulkEvaluationView from 'pages/dashboard/views/subjects.bulk';
import MainView from './views';
/**
 * Routes of subjects section
 *
 * @param {object} properties Properties.
 * @returns {React.Component} -
 */
export default function Routes(properties) {
	const { path } = properties;

	return (
		<Switch>
			<Route exact path={`${path}/`} component={MainView} />
			<Route exact path={`${path}/evaluation`} component={BulkEvaluationView} />
			<Route path='*' component={NotFound} />
		</Switch>
	);
}
