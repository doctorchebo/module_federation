import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScholarsDataProvider } from '../context';
import Scholars from '..';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';

jest.mock(
	'../views/MainView',
	() =>
		function MainView() {
			return <div></div>;
		}
);

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/dashboard/components/eventsManager/', () => {
	it('Should render by default', () => {
		const { container } = renderWithRouter(
			<DashBoardDataProvider>
				<ScholarsDataProvider>
					<Scholars />
				</ScholarsDataProvider>
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
