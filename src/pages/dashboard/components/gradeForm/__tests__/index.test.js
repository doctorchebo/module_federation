import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GradeForm from '../';

const properties = {
	formOptions: {
		titleMenu: 'Colors grade',
		title: 'Settings Grade',
		cancel: 'Cancel',
		save: 'Save',
	},
	gradeTypes: [
		{
			id: 1,
			name: 'A',
			value: 1,
			color: '#ff0000',
		},
		{
			id: 2,
			name: 'B',
			value: 2,
			color: '#ff00ff',
		},
	],
	headers: ['Grade', 'Color', 'Code'],
	onCancel: jest.fn(),
	onSubmit: jest.fn(),
};

describe('pages/dashboard/components/gradeForm', () => {
	describe('Html structure', () => {
		test('Should render a form with the properties', () => {
			render(<GradeForm {...properties} />);
			const gradeHeader = screen.queryByText('Grade');
			const colorHeader = screen.getByText('Color');
			const codeHeader = screen.getByText('Code');
			const colorValue = screen.getByText('#ff0000');
			const save = screen.getByText('Save');
			expect(gradeHeader).toBeDefined();
			expect(colorHeader).toBeDefined();
			expect(codeHeader).toBeDefined();
			expect(colorValue).toBeDefined();
			expect(save).toBeDefined();
		});
	});
	describe('Verify the funcionality of buttons', () => {
		test('Should call the button save', () => {
			const { container } = render(<GradeForm {...properties} />);
			const save = container.querySelector('[type="submit"]');
			fireEvent.click(save);
			expect(properties.onSubmit).toBeCalledTimes(1);
		});
		test('Should call the button cancel', () => {
			const { container } = render(<GradeForm {...properties} />);
			const cancel = container.querySelector('.ui.basic.button');
			fireEvent.click(cancel);
			expect(properties.onCancel).toBeCalledTimes(1);
		});
	});
});
