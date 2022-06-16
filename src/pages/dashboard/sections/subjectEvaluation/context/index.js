import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ActionFactory from './actions';

const Scholars = React.createContext();
const ScholarsDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function EvaluationDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(ActionFactory(dispatch));

	return (
		<Scholars.Provider value={value}>
			<ScholarsDispatch.Provider value={actions}>{children}</ScholarsDispatch.Provider>
		</Scholars.Provider>
	);
}

EvaluationDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useScholarsContext() {
	const state = useContext(Scholars);
	const actions = useContext(ScholarsDispatch);

	return [state, actions];
}
