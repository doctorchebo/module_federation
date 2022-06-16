import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ActionFactory from './actions';

const ApprovalHistoryContext = createContext();

const ApprovalHistoryDispatch = createContext();

/**
 * @param {object} props Properties.
 * @returns {React.Component} Component.
 */
export function ApprovalHistoryContextProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<ApprovalHistoryContext.Provider value={state}>
			<ApprovalHistoryDispatch.Provider value={actions}>
				{children}
			</ApprovalHistoryDispatch.Provider>
		</ApprovalHistoryContext.Provider>
	);
}

ApprovalHistoryContextProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} State and actions.
 */
export function useApprovalHistoryContext() {
	const state = useContext(ApprovalHistoryContext);
	const actions = useContext(ApprovalHistoryDispatch);

	return [state, actions];
}
