import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PermissionsTable from '..';
import { MemoryRouter } from 'react-router-dom';

const properties = {
	value: [
		{
			canView: false,
			canAdd: false,
			canEdit: false,
			canDelete: false,
		},
	],
	onChange: jest.fn(),
};

/**
 * @param {object} properties Properties
 * @returns {React.Component} Return a React component
 */
function renderComponent(properties) {
	return render(<PermissionsTable {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('src/pages/dashboard/components/permissions.table', () => {
	describe('HTML Structure', () => {
		test('Should render with default properties', () => {
			const { container } = renderComponent();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		test('Should render with properties', () => {
			const { container } = renderComponent(properties);
			const checkbox = container.querySelector('[type="checkbox"]');
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
			expect(checkbox).toBeDefined();
			expect(checkbox).toBeInstanceOf(HTMLInputElement);
		});

		test('Should render with None actions checked', () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');

			expect(checkboxes[0].checked).toBeTruthy();
			expect(checkboxes[1].checked).toBeFalsy();
			expect(checkboxes[2].checked).toBeFalsy();
			expect(checkboxes[3].checked).toBeFalsy();
			expect(checkboxes[4].checked).toBeFalsy();
			expect(checkboxes[5].checked).toBeFalsy();
		});

		test('Should render with All actions checked', () => {
			properties.value = [
				{
					canView: true,
					canAdd: true,
					canEdit: true,
					canDelete: true,
				},
			];
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');

			expect(checkboxes[0].checked).toBeFalsy();
			expect(checkboxes[1].checked).toBeTruthy();
			expect(checkboxes[2].checked).toBeTruthy();
			expect(checkboxes[3].checked).toBeTruthy();
			expect(checkboxes[4].checked).toBeTruthy();
			expect(checkboxes[5].checked).toBeTruthy();
		});
	});

	describe('Select checkboxes', () => {
		beforeAll(() => {
			properties.value = [
				{
					canView: false,
					canAdd: false,
					canEdit: false,
					canDelete: false,
				},
			];
		});

		test('Should check View action', async () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const canView = checkboxes[1];

			expect(canView.checked).toBeFalsy();
			fireEvent.change(canView, { target: { checked: true } });
			expect(canView.checked).toBeTruthy();
		});

		test('Should check Add action', async () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const canAdd = checkboxes[2];

			expect(canAdd.checked).toBeFalsy();
			fireEvent.change(canAdd, { target: { checked: true } });
			expect(canAdd.checked).toBeTruthy();
		});

		test('Should check Edit action', async () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const canEdit = checkboxes[3];

			expect(canEdit.checked).toBeFalsy();
			fireEvent.change(canEdit, { target: { checked: true } });
			expect(canEdit.checked).toBeTruthy();
		});

		test('Should check Delete action', async () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const canDelete = checkboxes[4];

			expect(canDelete.checked).toBeFalsy();
			fireEvent.change(canDelete, { target: { checked: true } });
			expect(canDelete.checked).toBeTruthy();
		});

		test('Should click on All checkboxes', () => {
			const { container } = renderComponent(properties);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');

			fireEvent.click(checkboxes[0]);
			fireEvent.click(checkboxes[1]);
			fireEvent.click(checkboxes[2]);
			fireEvent.click(checkboxes[3]);
			fireEvent.click(checkboxes[4]);
			fireEvent.click(checkboxes[5]);

			expect(properties.onChange).toHaveBeenCalledTimes(6);
		});
	});
});
