import { render } from '@testing-library/react';
import React from 'react';
import InnerLoader from '../index';

/**
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender() {
	const { container } = render(<InnerLoader />);
	return container;
}

describe('components/loader', () => {
	describe('Html structure', () => {
		it('Should render loader', () => {
			const container = customRender();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render the message loading', () => {
			const container = customRender();
			expect(container.querySelector('[name="loader"]')).toHaveTextContent('Loading');
		});
	});
});
