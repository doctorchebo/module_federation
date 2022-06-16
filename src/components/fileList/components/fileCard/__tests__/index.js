import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FileCard from '..';
describe('components/fileCard', () => {
	describe('Html structure', () => {
		const mockErrorMessage = 'Error message: test';

		it('should render success on load file correctly', () => {
			const { container } = render(<FileCard fileName='test' status='success' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('should render error on load file correctly', () => {
			const { container } = render(<FileCard fileName='test' status='error' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('should render error message correctly', () => {
			const { container } = render(
				<FileCard fileName='test' status='error' message={mockErrorMessage} />
			);
			const errorTitle = container.querySelector('[name="error_title"]');
			const errorDescription = container.querySelector('[name="error_description"]');

			expect(errorTitle).toBeDefined();
			expect(errorDescription).toBeDefined();
			expect(errorTitle.textContent).toBe('Error message:');
			expect(errorDescription.textContent).toBe('test');
		});

		it('should render loading file correctly', () => {
			const { container } = render(<FileCard fileName='test' status='loading' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('should render validing file correctly', () => {
			const { container } = render(<FileCard fileName='test' status='validing' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Events', () => {
		it('should triger on close event correctly', () => {
			const setClose = jest.fn();
			const { container } = render(
				<FileCard fileName='test' status='loading' onClose={setClose} />
			);
			const iconDismiss = container.querySelector('.close');
			fireEvent.click(iconDismiss);
			expect(setClose).toHaveBeenCalledTimes(1);
		});
	});
});
