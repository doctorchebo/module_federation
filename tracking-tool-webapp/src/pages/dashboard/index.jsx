import React from 'react';
import { DashBoardDataProvider } from './context/Context';
import MainView from './views/MainView';
import './index.css';

/**
 * @returns {React.Component} -
 */
export default function Dashboard() {
	return (
		<DashBoardDataProvider>
			<MainView />
		</DashBoardDataProvider>
	);
}
