import React from 'react';
import { render } from '@testing-library/react';
import RightSidebar from '..';

describe('components/rightSidebar', () => {
	describe('HTML Structure', () => {
		test('Should render a sidebar with default properties', () => {
			const { container } = render(<RightSidebar />);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		test('Should render a sidebar without header property', () => {
			const { container } = render(<RightSidebar header={null} />);
			const header = container.querySelector('.header');
			expect(container).toBeInstanceOf(HTMLDivElement);
			expect(header).toBe(null);
		});

		test('Should render a sidebar without footer property', () => {
			const { container } = render(<RightSidebar footer={null} />);
			const footer = container.querySelector('.footer');
			expect(container).toBeInstanceOf(HTMLDivElement);
			expect(footer).toBe(null);
		});

		test('Should render a sidebar with custom backButton', () => {
			const customHeader = {
				back: {
					basic: true,
					color: 'red',
					content: 'Return',
					icon: { name: 'left arrow', position: 'right' },
					size: 'large',
					onClick: () => {},
				},
			};
			const { container } = render(<RightSidebar header={customHeader} />);
			const backButton = container.querySelector('.header .button');
			const icon = backButton.firstElementChild;
			expect(backButton.className).toContain('basic');
			expect(backButton.className).toContain('red');
			expect(backButton.className).toContain('right');
			expect(backButton.className).toContain('large');
			expect(backButton.textContent).toBe('Return');
			expect(icon.className).toContain('left arrow');
		});

		test('Should render a sidebar with custom cancel button', () => {
			const customFooter = {
				cancel: {
					basic: true,
					color: 'red',
					content: 'Cancel',
					icon: null,
					size: 'tiny',
					onClick: () => {},
				},
				save: {
					onClick: () => {},
				},
			};
			const { container } = render(<RightSidebar footer={customFooter} />);
			const cancelButton = container.querySelectorAll('.footer .button')[0];
			const icon = cancelButton.firstElementChild;
			expect(cancelButton.className).toContain('basic');
			expect(cancelButton.className).toContain('red');
			expect(cancelButton.className).toContain('tiny');
			expect(cancelButton.textContent).toBe('Cancel');
			expect(icon).toBe(null);
		});

		test('Should render a sidebar with custom save button', () => {
			const customFooter = {
				cancel: {
					onClick: () => {},
				},
				save: {
					basic: false,
					color: 'red',
					content: 'Save',
					icon: { name: 'left arrow', position: 'right' },
					size: 'tiny',
					onClick: () => {},
				},
			};
			const { container } = render(<RightSidebar footer={customFooter} />);
			const saveButton = container.querySelectorAll('.footer .button')[1];
			const icon = saveButton.firstElementChild;
			expect(saveButton.className).toContain('red');
			expect(saveButton.className).toContain('tiny');
			expect(saveButton.className).toContain('right');
			expect(saveButton.textContent).toBe('Save');
			expect(icon.className).toContain('left arrow');
		});
	});
});
