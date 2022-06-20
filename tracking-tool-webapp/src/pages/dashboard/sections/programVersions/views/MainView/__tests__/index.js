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
	title: 'Program versions',
	errorMessages: [],
	status: [],
	programs: [],
	coordinators: [],
	programVersions: [],
	reports: null,
	fileTypes: '.json',
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	sideBar: false,
};
const mockAction = {
	onLoadProgramVersions: jest.fn(),
	onLoadProgramVersionsStatus: jest.fn(),
	onLoadPrograms: jest.fn(),
	onLoadCoordinators: jest.fn(),
	searchProgramVersion: jest.fn(),
};

jest.mock('pages/dashboard/sections/programVersions/context', () => {
	return {
		useProgramVersionsContext: () => {
			return [mockState, mockAction];
		},
	};
});

const mockDashboardState = {};
const mockDashboardAction = {};
const [mockFilterField, mocksSelectFilter] = [];
const [mockFilterValue, mockSelectFilterValue] = [];
const [mockSearchValue, mockSelectSearchValue] = ['', jest.fn()];

jest.mock('pages/dashboard/context/Context.js', () => {
	return {
		useDashBoardContext: () => {
			return [mockDashboardState, mockDashboardAction];
		},
		useSearchFilterContext: () => {
			return [
				mockFilterField,
				mocksSelectFilter,
				mockFilterValue,
				mockSelectFilterValue,
				mockSearchValue,
				mockSelectSearchValue,
			];
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

jest.mock('pages/dashboard/components/sidebar', () => {
	return function Sidebar() {
		return <div></div>;
	};
});

const mockApplicationState = {};
const mockApplicationAction = {
	onDimmedSidebar: jest.fn(),
};

jest.mock('application/context/AppContext.js', () => {
	return {
		useApplication: () => {
			return [mockApplicationState, mockApplicationAction];
		},
	};
});

jest.mock('pages/dashboard/components/search', () => {
	const mockSearch = () => <div>Mock Search</div>;
	return mockSearch;
});

describe('pages/dashboard/sections/programVersions/views/MainView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
