import React from 'react';
import { render } from '@testing-library/react';
import CreateRole from '..';
import { BrowserRouter } from 'react-router-dom';
import locale from '../../../locale/en.json';
import '@testing-library/jest-dom';

/**
 * @returns {*} renders the CreateView Component
 */
function customRender() {
	return render(<CreateRole />, { wrapper: BrowserRouter });
}

const mockState = { permissions: [] };
const mockAction = {
	onRoleSave: jest.fn((payload) => {
		return payload;
	}),
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

jest.mock('pages/dashboard/sections/roles/context/rolesContext', () => {
	return {
		useRolesContext: () => {
			return [mockState, mockAction];
		},
	};
});

describe('pages/dashboard/sections/roles/views/CreateView', () => {
	describe('HTML structure', () => {
		test('should be render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
			const form = container.querySelector('form');
			expect(container).toHaveTextContent(locale.roleForm.create.title);
			expect(form).toBeDefined();
			expect(form).toBeInstanceOf(HTMLFormElement);
		});
	});
});
