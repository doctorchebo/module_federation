import React, { useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { State, Reducer } from './state';
import ScholarActionFactory from './actions';

const SubjectEvaluation = React.createContext();
const SubjectEvaluationDispatch = React.createContext();

/**
 * @param {object} props - properties for the dataProvider.
 * @returns {React.Component} Data provider to have access to page context.
 */
export function SubjectEvaluationDetailDataProvider(props) {
	const { children } = props;
	const [value, dispatch] = useReducer(Reducer, props, State);
	const actions = useMemo(() => ScholarActionFactory(dispatch), [dispatch]);

	return (
		<SubjectEvaluation.Provider value={value}>
			<SubjectEvaluationDispatch.Provider value={actions}>
				{children}
			</SubjectEvaluationDispatch.Provider>
		</SubjectEvaluation.Provider>
	);
}

SubjectEvaluationDetailDataProvider.propTypes = {
	children: PropTypes.any,
};

/**
 * @returns {Array} - get context state and actions.
 */
export function useSubjectEvaluationContext() {
	const state = useContext(SubjectEvaluation);
	const actions = useContext(SubjectEvaluationDispatch);

	return [state, actions];
}
