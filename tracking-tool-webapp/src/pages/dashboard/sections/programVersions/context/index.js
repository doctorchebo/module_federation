import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ProgramVersionsActionFactory from './actions';

const ProgramVersions = React.createContext();
const ProgramVersionsDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function ProgramVersionsDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(ProgramVersionsActionFactory(dispatch));

	return (
		<ProgramVersions.Provider value={value}>
			<ProgramVersionsDispatch.Provider value={actions}>
				{children}
			</ProgramVersionsDispatch.Provider>
		</ProgramVersions.Provider>
	);
}

ProgramVersionsDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useProgramVersionsContext() {
	const state = useContext(ProgramVersions);
	const actions = useContext(ProgramVersionsDispatch);

	return [state, actions];
}
