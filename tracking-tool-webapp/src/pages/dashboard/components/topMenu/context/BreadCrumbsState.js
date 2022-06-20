import React, { useReducer } from 'react';
import { PropTypes } from 'prop-types';
import BreadCrumbsReducer from './breadCrumbsReducer';
import BreadCrumbsContext from './BreadCrumbsContext';

const BreadCrumbsState = (props) => {
	const initialState = {
		breadCrumbs: {},
	};

	const [state, dispatch] = useReducer(BreadCrumbsReducer, initialState);

	return (
		<BreadCrumbsContext.Provider value={{ list: state.breadCrumbs, dispatch }}>
			{props.children}
		</BreadCrumbsContext.Provider>
	);
};

BreadCrumbsState.propTypes = {
	children: PropTypes.any,
};

export default BreadCrumbsState;
