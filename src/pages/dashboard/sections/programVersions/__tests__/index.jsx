import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';
import ProgramVersions from '..';

jest.mock('../views/MainView', () => {
	// eslint-disable-next-line react/display-name
	return function () {
		return <div></div>;
	};
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/dashboard/sections/programVersions', () => {
	it('Has a program versions section to show', () => {
		const { container } = renderWithRouter(
			<DashBoardDataProvider>
				<ProgramVersions />
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
