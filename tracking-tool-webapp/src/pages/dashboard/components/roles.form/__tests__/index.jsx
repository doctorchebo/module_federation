import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RolesForm from '..';
import { MemoryRouter } from 'react-router-dom';
import locale from 'pages/dashboard/locale/en.json';

const properties = {
	value: {
		name: '',
		description: '',
	},
	loading: false,
	title: 'Role',
};

/**
 * @param {object} properties Properties
 * @returns {*} renders the RolesForm component
 */
function renderComponent(properties) {
	return render(<RolesForm {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('dashboard/sections/roles/components/roles.form', () => {
	describe('HTML structure', () => {
		test('should render the role form', () => {
			const { container } = renderComponent();
			expect(container).not.toBeEmptyDOMElement();
			expect(container.querySelector('.form')).not.toBeNull();
			expect(container.querySelector('.button-back')).not.toBeNull();
			expect(container.querySelector('[type="submit"]')).not.toBeNull();
		});
		test('should have the name and description fields', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="name"]')).not.toBeNull();
			expect(container.querySelector('[name="description"]')).not.toBeNull();
		});
		test('should have the table of permissions', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('.table')).toBeInstanceOf(HTMLTableElement);
		});
	});

	describe('When the Name field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const nameField = container.querySelector('[name="name"]');
			fireEvent.change(nameField, { target: { value } });
			expect(nameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.roleForm.errorMessages.name.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const nameField = container.querySelector('[name="name"]');
			fireEvent.change(nameField, { target: { value } });
			expect(nameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.roleForm.errorMessages.name.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the Description field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const descriptionField = container.querySelector('[name="description"]');
			fireEvent.change(descriptionField, { target: { value } });
			expect(descriptionField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.roleForm.errorMessages.description.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const descriptionField = container.querySelector('[name="description"]');
			fireEvent.change(descriptionField, { target: { value } });
			expect(descriptionField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.roleForm.errorMessages.description.maxLength.replace('%s', 255)
			);
		});
	});
});
