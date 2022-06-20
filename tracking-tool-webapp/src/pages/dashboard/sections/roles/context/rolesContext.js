import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ActionFactory from './actions';

const Roles = React.createContext();
const RolesDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function RolesDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<Roles.Provider value={value}>
			<RolesDispatch.Provider value={actions}>{children}</RolesDispatch.Provider>
		</Roles.Provider>
	);
}

RolesDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useRolesContext() {
	const state = useContext(Roles);
	const actions = useContext(RolesDispatch);

	return [state, actions];
}
