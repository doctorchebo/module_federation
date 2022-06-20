import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ActionFactory from './actions';

const EvaluationContext = createContext();

const EvaluationDispatch = createContext();

/**
 * @param {object} props Properties.
 * @returns {React.Component} Component.
 */
export function EvaluationContextProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<EvaluationContext.Provider value={state}>
			<EvaluationDispatch.Provider value={actions}>{children}</EvaluationDispatch.Provider>
		</EvaluationContext.Provider>
	);
}

EvaluationContextProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} State and actions.
 */
export function useEvaluationContext() {
	const state = useContext(EvaluationContext);
	const actions = useContext(EvaluationDispatch);

	return [state, actions];
}
