import React from 'react';
import MainView from './views/MainView';
import { CandidatesDataProvider } from './context';

/**
 * @returns {React.Component} - Component for Candidates page.
 */
function Candidates() {
	return (
		<CandidatesDataProvider>
			<MainView />
		</CandidatesDataProvider>
	);
}

export default Candidates;
