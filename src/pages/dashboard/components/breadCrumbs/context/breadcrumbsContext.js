import React, { useContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import BreadcrumbsActionFactory from './actions';

const Breadcrumbs = React.createContext();
const BreadcrumbsDispatch = React.createContext();

/**
 * @param {object} props - properties for the context.
 * @returns {React.Component} component to access context information.
 */
export function BreadcrumbsDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const [actions] = useState(BreadcrumbsActionFactory(dispatch));

	return (
		<Breadcrumbs.Provider value={value}>
			<BreadcrumbsDispatch.Provider value={actions}>{children}</BreadcrumbsDispatch.Provider>
		</Breadcrumbs.Provider>
	);
}

BreadcrumbsDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} - with state and actions.
 */
export function useBreadcrumbsContext() {
	const state = useContext(Breadcrumbs);
	const actions = useContext(BreadcrumbsDispatch);

	return [state, actions];
}
