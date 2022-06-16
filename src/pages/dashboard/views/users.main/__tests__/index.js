import React from 'react';
import { render } from '@testing-library/react';
import MainView from '..';
import { MemoryRouter } from 'react-router-dom';

/**
 * @returns {*} renders the MainView Component
 */
function customRender() {
	return render(<MainView />, { wrapper: MemoryRouter });
}

const mockState = {
	title: 'Users',
	errorMessages: [],
	users: [],
	reports: null,
	fileTypes: '.csv .xlsx',
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	sideBar: false,
	roles: [],
};

const mockAction = {
	onUsersLoad: jest.fn(),
	onRolesLoad: jest.fn(),
};

const mockRolesState = {
	title: 'Roles',
	errorMessages: [],
	users: [],
	reports: null,
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	sideBar: false,
	permissions: [],
};

const mockRolesAction = {
	onLoadRoles: jest.fn(),
};

jest.mock('pages/dashboard/sections/users/context/usersContext', () => {
	return {
		useUsersContext: () => {
			return [mockState, mockAction];
		},
	};
});

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

jest.mock('pages/dashboard/sections/roles/context/rolesContext', () => {
	return {
		useRolesContext: () => {
			return [mockRolesState, mockRolesAction];
		},
	};
});

const mockDashboardState = {};
const mockDashboardAction = {
	setImportContent: jest.fn(),
};

jest.mock('pages/dashboard/context/Context.js', () => {
	return {
		useDashBoardContext: () => {
			return [mockDashboardState, mockDashboardAction];
		},
	};
});

jest.mock('pages/dashboard/components/sidebar', () => {
	return function Sidebar() {
		return <div></div>;
	};
});

describe('pages/dashboard/views/users.main', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
