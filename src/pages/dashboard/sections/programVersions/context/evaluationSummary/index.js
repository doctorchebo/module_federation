import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ActionFactory from './actions';

const EvaluationSummaryContext = createContext();

const EvaluationSummaryDispatch = createContext();

/**
 * @param {object} props Properties.
 * @returns {React.Component} Component.
 */
export function EvaluationSummaryContextProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<EvaluationSummaryContext.Provider value={state}>
			<EvaluationSummaryDispatch.Provider value={actions}>
				{children}
			</EvaluationSummaryDispatch.Provider>
		</EvaluationSummaryContext.Provider>
	);
}

EvaluationSummaryContextProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} State and actions.
 */
export function useEvaluationSummaryContext() {
	const state = useContext(EvaluationSummaryContext);
	const actions = useContext(EvaluationSummaryDispatch);

	return [state, actions];
}
