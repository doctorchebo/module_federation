import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Message from '../index';

describe('components/Message', () => {
	describe('Html structure', () => {
		it('Should render the message component by default', () => {
			const { container } = render(<Message />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('Handling message events', () => {
		it('Should remove the message component when clicking on close icon', () => {
			const { container } = render(<Message />);
			const iconElement = container.querySelector('i[class="close icon"]');
			expect(container).not.toBeEmptyDOMElement();
			fireEvent.click(iconElement);
			expect(container).toBeEmptyDOMElement();
		});
	});
});
