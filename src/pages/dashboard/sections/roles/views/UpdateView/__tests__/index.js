import React from 'react';
import { render } from '@testing-library/react';
import UpdateView from '..';
import { BrowserRouter } from 'react-router-dom';

const defaultProperties = {
	role: {
		name: '',
		description: '',
		permissions: [],
	},
	title: '',
};
const mockRolesStore = { title: '', roles: [{ name: '', description: '', permissions: [] }] };
const mockRolesAction = { onPutRole: jest.fn() };

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		state: defaultProperties.role,
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

jest.mock('../../../context/rolesContext', () => ({
	useRolesContext: () => {
		return [mockRolesStore, mockRolesAction];
	},
}));

const renderComponent = () => {
	return render(<UpdateView />, {
		wrapper: BrowserRouter,
	});
};

describe('roles/views/UpdateView', () => {
	describe('HTML structure', () => {
		test('should render updateView', () => {
			const { container } = renderComponent();
			const firstChild = container.firstChild;
			expect(firstChild).toBeInstanceOf(HTMLDivElement);
			expect(firstChild.classList.contains('personal-container')).toBe(true);
		});
	});
});
