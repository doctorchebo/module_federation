import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Users from '..';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';

jest.mock(
	'pages/dashboard/views/users.main',
	() =>
		function MainView() {
			return <div></div>;
		}
);

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('Users section page', () => {
	it('has a Users section to show', () => {
		const { container } = renderWithRouter(
			<DashBoardDataProvider>
				<Users />
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
