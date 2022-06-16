import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ActionFactory from './actions';

const Status = React.createContext();
const StatusDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function StatusDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<Status.Provider value={value}>
			<StatusDispatch.Provider value={actions}>{children}</StatusDispatch.Provider>
		</Status.Provider>
	);
}

StatusDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useStatusContext() {
	const state = useContext(Status);
	const actions = useContext(StatusDispatch);

	return [state, actions];
}
