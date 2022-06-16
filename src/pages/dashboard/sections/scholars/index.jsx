import React from 'react';
import { ScholarsDataProvider } from './context';
import MainView from './views/MainView';

/**
 * @returns {React.Component} - Component for Scholars Page.
 */
function Scholars() {
	return (
		<ScholarsDataProvider>
			<MainView />
		</ScholarsDataProvider>
	);
}

export default Scholars;
