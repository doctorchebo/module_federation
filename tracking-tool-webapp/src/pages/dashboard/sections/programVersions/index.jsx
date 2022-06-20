import React from 'react';
import { ProgramVersionsDataProvider } from './context';
import MainView from './views/MainView';

/**
 * @returns {React.Component} - Component for Program Versions Main.
 */
function ProgramVersions() {
	return (
		<ProgramVersionsDataProvider>
			<MainView />
		</ProgramVersionsDataProvider>
	);
}

export default ProgramVersions;
