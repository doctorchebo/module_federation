import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Roles from '..';
import { DashBoardDataProvider } from 'pages/dashboard/context/Context';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: MemoryRouter });
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useRouteMatch: () => ({
		path: '',
	}),
}));

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

describe('Roles section page', () => {
	it('has a Roles section to show', () => {
		const { container } = renderWithRouter(
			<DashBoardDataProvider>
				<Roles />
			</DashBoardDataProvider>
		);
		expect(container).toBeDefined();
	});
});
