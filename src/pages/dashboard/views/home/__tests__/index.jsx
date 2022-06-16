import React from 'react';
import { render } from '@testing-library/react';
import HomeView from '..';
import locale from '../locale/en.json';
import '@testing-library/jest-dom';

/**
 *
 * @returns {React.Component} Returns the Home view component
 */
function customRender() {
	const { container } = render(<HomeView />);
	const root = container.querySelector('.home');

	return { root };
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

describe('pages/dashboard/views/home', () => {
	describe('HTML structure', () => {
		test('should render the view by default', () => {
			const { root } = customRender();

			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
		test('should render the welcome message', () => {
			const { root } = customRender();

			expect(root).toHaveTextContent(locale.welcome);
		});
	});
});
