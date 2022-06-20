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

jest.mock('application/context/AppContext', () => {
	const state = {
		sidebarHistory: {},
	};
	const actions = {};

	return {
		useApplication: () => [state, actions],
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

const mockState = {
	title: 'Scholars',
	errorMessages: [],
	scholars: [],
	reports: null,
	fileTypes: '.csv .xlsx',
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	rightSideBar: false,
	rightSideBarProgram: false,
	selectedScholar: {},
	showEventForm: false,
	showChangeStatusForm: false,
	programsInProgress: [],
	programVersions: [],
	statusType: [],
	applicantsType: [],
};
const mockAction = {
	onLoadScholars: jest.fn(),
	onLoadProgramsInProgress: jest.fn(),
	onLoadProgramVersions: jest.fn(),
	onLoadStatus: jest.fn(),
	onLoadApplicantsTypes: jest.fn(),
	searchScholar: jest.fn(),
};
const [mockFilterField, mocksSelectFilter] = [];
const [mockFilterValue, mockSelectFilterValue] = [];
const [mockSearchValue, mockSelectSearchValue] = ['', jest.fn()];
jest.mock('pages/dashboard/sections/scholars/context', () => {
	return {
		useScholarsContext: () => {
			return [mockState, mockAction];
		},
	};
});

const mockDashboardState = {};
const mockDashboardAction = {};

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

jest.mock('pages/dashboard/components/sidebar', () => {
	return function Sidebar() {
		return <div></div>;
	};
});

describe('pages/dashboard/sections/scholars/views/MainView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
