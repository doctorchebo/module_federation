import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Subjects from '..';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';
import { SubjectDetailsDataProvider } from '../context/subjectDetailsContext';

jest.mock(
	'../views',
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
				<SubjectDetailsDataProvider>
					<Subjects />
				</SubjectDetailsDataProvider>
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
