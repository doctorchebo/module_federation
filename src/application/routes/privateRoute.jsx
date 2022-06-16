import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

/**
 * @param {object} props -
 * @returns {React.Component} -
 */
export default function PrivateRoute(props) {
	const { component: Component, ...rest } = props;
	return (
		<Route
			{...rest}
			render={(props) => {
				return <Component {...props} />;
			}}
		/>
	);
}

PrivateRoute.propTypes = {
	component: PropTypes.any,
};
