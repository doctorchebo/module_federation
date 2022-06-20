/* eslint-disable indent */
/* istanbul ignore file */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import PrivateRoute from './privateRoute';
import InnerLoader from '../components/loader';
import NotFound from 'components/notFound';
import Login from 'pages/login';

/**
 * @param {object} props -
 * @returns {React.Component} -
 */
export default function FactoryRoutes(props) {
	const { items, state, pathname } = props;
	const { isLoggedIn, profile, role, locale, messages } = state;
	const targetComponent = localStorage.getItem('token') ? NotFound : Login;
	const isAllowed = (item) =>
		item.protected === true &&
		item.roles.includes(role) &&
		isLoggedIn &&
		localStorage.getItem('token');

	const routes = items
		.filter((item) => item.protected === undefined)
		.map((item, index) => {
			return (
				<Route
					key={index}
					exact
					path={item.link}
					render={() => <item.component locale={locale} messages={messages} />}
				/>
			);
		});

	const privateRoutes = items
		.filter((item) => isAllowed(item))
		.map((item, index) => {
			return (
				<PrivateRoute
					key={index}
					path={item.link}
					roles={item.roles}
					profile={profile}
					component={item.component}
				/>
			);
		});

	//TODO: refactor ternary operators with conditionals and switch
	return (
		<>
			{state.loading ? (
				<InnerLoader />
			) : (
				<Segment basic style={{ padding: 0 }}>
					<Switch>
						{routes}
						{privateRoutes}
						<Route path='*' component={targetComponent} />
					</Switch>
					{!isLoggedIn && pathname === '/verify-email' ? (
						<Redirect to={'/verify-email'} />
					) : !isLoggedIn && pathname === '/reset-password' ? (
						<Redirect to={'/reset-password'} />
					) : !isLoggedIn && pathname !== '/login' ? (
						<Redirect to={'/'} />
					) : isLoggedIn && pathname === '/login' ? (
						<Redirect to={'/dashboard'} />
					) : (
						<Redirect to={pathname} />
					)}
				</Segment>
			)}
		</>
	);
}

FactoryRoutes.propTypes = {
	items: PropTypes.array,
	pathname: PropTypes.string,
	state: PropTypes.object,
};
