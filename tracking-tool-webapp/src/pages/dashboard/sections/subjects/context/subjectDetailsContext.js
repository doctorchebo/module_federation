import React, { useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';

import { State, Reducer } from './state';
import SubjectDetailsFactory from './actions';

const subjectDetails = React.createContext();
const subjectDetailsDispatch = React.createContext();

/**
 * @param {object} props -
 * @returns {React.Component} component
 */
export function SubjectDetailsDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => SubjectDetailsFactory(dispatch), [dispatch]);
	return (
		<subjectDetails.Provider value={value}>
			<subjectDetailsDispatch.Provider value={actions}>
				{children}
			</subjectDetailsDispatch.Provider>
		</subjectDetails.Provider>
	);
}

SubjectDetailsDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} -
 */
export function useSubjectDetailsContext() {
	const state = useContext(subjectDetails);
	const actions = useContext(subjectDetailsDispatch);

	return [state, actions];
}
