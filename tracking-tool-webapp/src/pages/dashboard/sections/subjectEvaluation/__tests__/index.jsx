import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';
import { EvaluationDataProvider } from '../context';
import SubjectEvaluation from '..';

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
				<EvaluationDataProvider>
					<SubjectEvaluation />
				</EvaluationDataProvider>
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
