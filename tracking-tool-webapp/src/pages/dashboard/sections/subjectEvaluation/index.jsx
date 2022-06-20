import React from 'react';
import { EvaluationDataProvider } from './context';
import MainView from './views';

/**
 * @returns {React.Component} - Component for subjectEvaluation page.
 */
function subjectEvaluation() {
	return (
		<EvaluationDataProvider>
			<MainView />
		</EvaluationDataProvider>
	);
}

export default subjectEvaluation;
