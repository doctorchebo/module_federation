import React from 'react';
import { render } from '@testing-library/react';
import RoleDetails from '..';
import { MemoryRouter } from 'react-router-dom';

const properties = {
	value: {
		name: '',
		description: '',
		deleted: false,
		actions: [
			{
				canView: true,
				canAdd: true,
				canEdit: true,
				canDelete: true,
				permissions: {
					name: '',
					description: '',
				},
			},
			{
				canView: false,
				canAdd: false,
				canEdit: false,
				canDelete: false,
				permissions: {
					name: '',
					description: '',
				},
			},
		],
	},
};

/**
 * @param {object} properties Properties
 * @returns {*} renders the RoleDetails component
 */
function renderComponent(properties) {
	return render(<RoleDetails {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('src/pages/dashboard/components/roles.details', () => {
	describe('HTML structure', () => {
		test('should render roles details', () => {
			const { container } = renderComponent(properties);
			expect(container).toBeDefined();
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
			expect(container.firstChild.childNodes).toHaveLength(2);
		});
		test('should render fields of role', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('.title')).toBeDefined();
			expect(container.querySelector('.description')).toBeDefined();
			expect(container.querySelector('.permission-list')).toBeDefined();
		});
	});
});
