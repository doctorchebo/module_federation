import React from 'react';
import { render, screen } from '@testing-library/react';
import MainView from '..';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

/**
 * @returns {*} renders the MainView Component
 */
function customRender() {
	return render(<MainView />, { wrapper: MemoryRouter });
}

const mockState = {
	title: 'Candidates',
	errorMessages: [],
	candidates: [],
	reports: null,
	loading: false,
	programVersions: [],
	statusType: [],
};
const mockAction = {
	onLoadCandidates: jest.fn(),
	onLoadProgramVersions: jest.fn(),
	onLoadStatus: jest.fn(),
};
const [mockFilterField, mocksSelectFilter] = [];
const [mockFilterValue, mockSelectFilterValue] = [];
const [mockSearchValue, mockSelectSearchValue] = [];
const sideBarActions = {};
jest.mock('pages/dashboard/sections/candidates/context', () => {
	return {
		useCandidatesContext: () => {
			return [mockState, mockAction];
		},
	};
});

jest.mock('pages/dashboard/context/Context.js', () => {
	return {
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
		useDashBoardContext: () => {
			return [{}, sideBarActions];
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

describe('pages/dashboard/sections/candidates/views/MainView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
		test('renders title appropriately', () => {
			render(<MainView />);
			expect(screen.getByText(/candidates/i)).toBeInTheDocument();
		});
	});
});
