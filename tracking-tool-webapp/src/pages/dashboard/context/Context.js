import React, { useContext, useReducer, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import ActionFactory from './actions';

const DashBoard = React.createContext();
const DashBoardDispatch = React.createContext();

/**
 * @param {object} props - properties for the dataProvider.
 * @returns {React.Component} Data provider to have access to page context.
 */
export function DashBoardDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ActionFactory(dispatch), [dispatch]);

	return (
		<DashBoard.Provider value={value}>
			<DashBoardDispatch.Provider value={actions}>{children}</DashBoardDispatch.Provider>
		</DashBoard.Provider>
	);
}

DashBoardDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} - get context state and actions.
 */
export function useDashBoardContext() {
	const state = useContext(DashBoard);
	const actions = useContext(DashBoardDispatch);

	return [state, actions];
}

/**
 * @returns {Array} - get filter an search parameters
 */
export function useSearchFilterContext() {
	const [filterField, selectFilter] = useState('');
	const [filterValue, selectFilterValue] = useState('');
	const [searchValue, selectSearchValue] = useState('');
	return [
		filterValue,
		filterField,
		searchValue,
		selectFilter,
		selectFilterValue,
		selectSearchValue,
	];
}
