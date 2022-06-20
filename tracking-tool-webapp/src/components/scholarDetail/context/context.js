import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ScholarActionFactory from './actions';

const ScholarDetail = React.createContext();
const ScholarDetailDispatch = React.createContext();

/**
 * @param {object} props - properties for the dataProvider.
 * @returns {React.Component} Data provider to have access to page context.
 */
export function ScholarDetailDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ScholarActionFactory(dispatch), [dispatch]);

	return (
		<ScholarDetail.Provider value={value}>
			<ScholarDetailDispatch.Provider value={actions}>
				{children}
			</ScholarDetailDispatch.Provider>
		</ScholarDetail.Provider>
	);
}

ScholarDetailDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} - get context state and actions.
 */
export function useScholarDetailContext() {
	const state = useContext(ScholarDetail);
	const actions = useContext(ScholarDetailDispatch);

	return [state, actions];
}
