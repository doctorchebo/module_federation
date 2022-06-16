import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationComponent from '..';

describe('components/Addons/PaginationComponent', () => {
	describe('Html structure', () => {
		it('Should render item with default properties', () => {
			const { container } = render(<PaginationComponent />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render item with properties currentPage not equals TotalPages', () => {
			const { container } = render(
				<PaginationComponent currentPage={8} totalPages={10} size={10} totalResults={100} />
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render item with properties currentPage equals TotalPages', () => {
			const { container } = render(
				<PaginationComponent
					currentPage={10}
					totalPages={10}
					size={10}
					totalResults={100}
				/>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Test click event', () => {
		it('Click on fistItem should change the active page', () => {
			const mockOnPageChanged = jest.fn((pageNumber) => pageNumber);
			render(<PaginationComponent onPageChanged={mockOnPageChanged} />);
			fireEvent.click(screen.getByText(2));

			expect(mockOnPageChanged.mock.calls).toHaveLength(1);
			expect(mockOnPageChanged.mock.results[0].value).toBe(2);
		});
	});
});
