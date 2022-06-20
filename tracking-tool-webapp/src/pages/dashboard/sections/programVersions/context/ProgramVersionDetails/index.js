import React, { createContext, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ActionFactory from './actions';

const ProgramVersionDetailsContext = createContext();

const ProgramVersionDetailsDispatch = createContext();

/**
 * @param {object} props Properties.
 * @returns {React.Component} Component.
 */
export function ProgramVersionDetailsContextProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<ProgramVersionDetailsContext.Provider value={state}>
			<ProgramVersionDetailsDispatch.Provider value={actions}>
				{children}
			</ProgramVersionDetailsDispatch.Provider>
		</ProgramVersionDetailsContext.Provider>
	);
}

ProgramVersionDetailsContextProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} State and actions.
 */
export function useProgramVersionDetailsContext() {
	const state = useContext(ProgramVersionDetailsContext);
	const actions = useContext(ProgramVersionDetailsDispatch);

	return [state, actions];
}
