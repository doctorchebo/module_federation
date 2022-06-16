import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RoleSelector from '..';
import { MemoryRouter } from 'react-router-dom';

const properties = {
	items: [
		{
			id: '',
			name: '',
		},
	],
	value: [],
	onSelect: jest.fn(),
};

/**
 * @param {object} properties Properties
 * @returns {*} renders the RoleForm component
 */
function renderComponent(properties) {
	return render(<RoleSelector {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('dashboard/sections/roles/components/roleForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const { container } = renderComponent();
			const checkbox = container.querySelector('[type="checkbox"]');
			expect(container).toBeDefined();
			expect(checkbox).toBeNull();
		});

		test('Should render with custom properties', () => {
			const { container } = renderComponent(properties);
			const checkbox = container.querySelector('[type="checkbox"]');
			expect(container).toBeDefined();
			expect(checkbox).toBeDefined();
			expect(checkbox.checked).toBeFalsy();
		});
	});

	describe('Checkbox behaviour', () => {
		test('should onSelect is called every checkbox change state', () => {
			const { container } = renderComponent(properties);
			const checkbox = container.querySelector('[type="checkbox"]');
			fireEvent.click(checkbox);
			fireEvent.click(checkbox);
			fireEvent.click(checkbox);
			expect(properties.onSelect).toHaveBeenCalledTimes(3);
		});
	});
});
