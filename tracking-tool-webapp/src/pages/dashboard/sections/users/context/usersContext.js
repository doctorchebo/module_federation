import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import UsersActionFactory from './actions';

const Users = React.createContext();
const UsersDispatch = React.createContext();

/**
 * @param {object} props - properties for the context.
 * @returns {React.Component} component to access context information.
 */
export function UsersDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(UsersActionFactory(dispatch));

	return (
		<Users.Provider value={value}>
			<UsersDispatch.Provider value={actions}>{children}</UsersDispatch.Provider>
		</Users.Provider>
	);
}

UsersDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} - with state and actions.
 */
export function useUsersContext() {
	const state = useContext(Users);
	const actions = useContext(UsersDispatch);

	return [state, actions];
}
