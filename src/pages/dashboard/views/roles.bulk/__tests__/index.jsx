import React from 'react';
import { render } from '@testing-library/react';
import BulkEditView from '..';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockState = {
	title: '',
	errorMessages: [],
	roles: [
		{
			id: '',
			name: '',
			description: '',
			deleted: false,
			actions: [],
		},
	],
	permissions: [],
	loading: false,
};

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

const mockAction = { onBulkEditRoles: jest.fn() };

jest.mock('pages/dashboard/sections/roles/context/rolesContext', () => ({
	useRolesContext: () => {
		return [mockState, mockAction];
	},
}));

const renderComponent = () => {
	return render(<BulkEditView />, {
		wrapper: BrowserRouter,
	});
};

describe('dashboard/views/roles.bulk', () => {
	describe('HTML structure', () => {
		test('should render BulkEditView', () => {
			const { container } = renderComponent();
			const form = container.querySelector('form');
			expect(container).toHaveTextContent('Bulk Edit Roles');
			expect(container).toBeDefined();
			expect(form).toBeDefined();
		});
	});
});
