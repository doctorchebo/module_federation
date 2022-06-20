import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import RolesBulkForm from '../';

const formTitle = 'Bulk Edit Roles';

const properties = {
	title: formTitle,
	items: [
		{
			id: 'ROLE-01',
			name: 'Trainer',
		},
	],
	value: {
		idsOfRoles: ['Role-01'],
		permissions: [
			{
				canView: false,
				canAdd: false,
				canEdit: false,
				canDelete: false,
			},
		],
	},
	onSelectRole: jest.fn(),
	onSubmit: jest.fn(),
};

const renderWithRouter = (ui, { routes = ['/'] } = {}) => {
	return render(<MemoryRouter initialEntries={routes}>{ui}</MemoryRouter>);
};

describe('pages/dashboard/components/roles.bulk.form', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = renderWithRouter(<RolesBulkForm />);
			const title = screen.queryByText(formTitle);
			const rolesTableTitle = screen.getByText('Roles');
			const permissionTableTitle = screen.getByText('Permission');
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const save = screen.getByRole('button', { name: /save/i });
			expect(container).toBeDefined();
			expect(title).toBeNull();
			expect(rolesTableTitle).toBeDefined();
			expect(permissionTableTitle).toBeDefined();
			expect(checkboxes).toBeDefined();
			expect(checkboxes).toHaveLength(0);
			expect(save).toBeDefined();
			expect(save).toBeDisabled();
		});

		test('Should render with custom properties', () => {
			const { container } = renderWithRouter(<RolesBulkForm {...properties} />);
			const title = screen.queryByText(formTitle);
			const rolesTableTitle = screen.getByText('Roles');
			const permissionTableTitle = screen.getByText('Permission');
			const rol = screen.queryByText('Trainer');
			const checkbox = container.querySelector('[type="checkbox"]');
			const save = screen.getByRole('button', { name: /save/i });
			expect(container).toBeDefined();
			expect(title).toBeDefined();
			expect(rolesTableTitle).toBeDefined();
			expect(rol).toBeDefined();
			expect(checkbox).toBeDefined();
			expect(checkbox.checked).toBeFalsy();
			expect(permissionTableTitle).toBeDefined();
			expect(save).toBeDefined();
			expect(save).toBeDisabled();
		});
	});

	describe('BulkEditForm behaviour', () => {
		test('Should call the function onSelectRole every time Roles Table selector Change', () => {
			const { container } = renderWithRouter(<RolesBulkForm {...properties} />);
			const checkbox = container.querySelector('.role-selector-container [type="checkbox"]');
			fireEvent.click(checkbox);
			fireEvent.click(checkbox);
			expect(properties.onSelectRole).toBeCalledTimes(2);
		});

		test('Should not call the function onSelectRole when permissions are selected', () => {
			const { container } = renderWithRouter(<RolesBulkForm {...properties} />);
			const checkbox = container.querySelector('.permissions-container [type="checkbox"]');
			fireEvent.click(checkbox);
			expect(properties.onSelectRole).not.toBeCalled();
		});

		test('Should enabled save button when Selected State is True', () => {
			renderWithRouter(<RolesBulkForm {...properties} selected={true} />);
			const save = screen.getByRole('button', { name: /save/i });
			expect(save).toBeEnabled();
		});

		test('Should the onSubmit function be called when save button is pressed', () => {
			renderWithRouter(<RolesBulkForm {...properties} selected={true} />);
			const save = screen.getByRole('button', { name: /save/i });
			fireEvent.click(save);
			expect(properties.onSubmit).toBeCalled();
		});
	});
});
