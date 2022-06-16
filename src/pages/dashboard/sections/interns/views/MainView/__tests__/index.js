import React from 'react';
import { render, screen } from '@testing-library/react';
import MainView from '../../..';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

/**
 * @returns {*} renders the MainView Component
 */
function customRender() {
	return render(<MainView />, { wrapper: MemoryRouter });
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

describe('pages/dashboard/sections/interns/views/MainView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
		test('renders title appropriately', () => {
			render(<MainView />);
			expect(screen.getByText(/interns/i)).toBeInTheDocument();
		});
	});
});
