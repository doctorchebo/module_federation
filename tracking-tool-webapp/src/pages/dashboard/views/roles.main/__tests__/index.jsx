import React from 'react';
import { render } from '@testing-library/react';
import RolesMainView from '..';
import { MemoryRouter } from 'react-router-dom';

/**
 * @returns {*} renders the RolesMainView Component
 */
function customRender() {
	const { container } = render(<RolesMainView />, { wrapper: MemoryRouter });
	const root = container.querySelector('.main');
	return {
		root,
	};
}

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

const mockState = {
	title: 'Roles',
	errorMessages: [],
	roles: [],
	permissions: [],
	reports: null,
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	sideBar: false,
};
const mockAction = {
	onLoadRoles: jest.fn(),
	onLoadPermissions: jest.fn(),
};

jest.mock('pages/dashboard/sections/roles/context/rolesContext', () => {
	return {
		useRolesContext: () => {
			return [mockState, mockAction];
		},
	};
});

describe('pages/dashboard/views/roles.main', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { root } = customRender();
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLElement);
		});
	});
});
