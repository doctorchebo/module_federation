import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RolesTable from '../';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);
	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/dashboard/components/roles.table', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = renderWithRouter(
				<Provider store={mockStoreConfig({})}>
					<RolesTable />
				</Provider>
			);
			expect(container).toBeInstanceOf(HTMLElement);
		});

		test('Should render with custom properties', () => {
			const customProperties = {
				roles: [
					{ id: 1, name: 'rol1', description: 'description1' },
					{ id: 2, name: 'rol2', description: 'description2' },
				],
				onDelete: () => {},
			};
			const { container } = renderWithRouter(
				<Provider store={mockStoreConfig({})}>
					<RolesTable {...customProperties} />
				</Provider>
			);

			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
