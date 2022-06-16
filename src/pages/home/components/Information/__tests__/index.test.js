import React from 'react';
import { render } from '@testing-library/react';
import Information from '../';
import { value } from '../__mock__/data';
/**
 *
 * @param {object} props -
 * @returns {HTMLElement} -
 */
function renderComponent(props) {
	const { container } = render(<Information {...props} />);
	const element = container.querySelector('.information-content');
	return element;
}

describe('pages/home/components/Information', () => {
	describe('Html structure', () => {
		it('Should render Information', () => {
			const element = renderComponent({ value });
			expect(element).toBeDefined();
			expect(element).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render the information title', () => {
			const element = renderComponent({ value });
			const tittle = element.querySelector('.information-title');
			expect(tittle).toBeInstanceOf(HTMLHeadingElement);
			expect(tittle.textContent).toBe('Test Header');
		});
		it('Should render the information body', () => {
			const element = renderComponent({ value });
			const body = element.querySelector('.information-body');
			expect(body).toBeInstanceOf(HTMLParagraphElement);
			expect(body.textContent).toBe('Test Body');
		});
	});
});
