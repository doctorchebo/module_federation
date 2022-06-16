import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import CandidateActionFactory from './action';

const Candidates = React.createContext();
const CandidatesDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function CandidatesDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(CandidateActionFactory(dispatch));

	return (
		<Candidates.Provider value={value}>
			<CandidatesDispatch.Provider value={actions}>{children}</CandidatesDispatch.Provider>
		</Candidates.Provider>
	);
}

CandidatesDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useCandidatesContext() {
	const state = useContext(Candidates);
	const actions = useContext(CandidatesDispatch);

	return [state, actions];
}
