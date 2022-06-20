import React from 'react';
import { render } from '@testing-library/react';
import InformationSection from '../';
import { normal, reversed } from '../__mock__/data';
/**
 *
 * @param {object} props -
 * @returns {HTMLElement} -
 */
function renderComponent(props) {
	const { container } = render(<InformationSection {...props} />);
	const element = container.querySelector('.information-section .row');
	return element;
}

describe('pages/home/components/InformationSection', () => {
	describe('Html structure', () => {
		it('Should render InformationSection component', () => {
			const element = renderComponent({ ...normal });
			expect(element).toBeDefined();
			expect(element).toBeInstanceOf(HTMLDivElement);
		});
		it('Should first row is an image', () => {
			const element = renderComponent({ ...normal });
			const firstItem = element.firstChild;
			const image = firstItem.firstChild;
			expect(image).toBeInstanceOf(HTMLImageElement);
		});
		it('Should first row is not a image', () => {
			const element = renderComponent({ ...reversed });
			const firstItem = element.firstChild;
			const paragraph = firstItem.firstChild;
			const header = paragraph.querySelector('.information-title');
			const body = paragraph.querySelector('.information-body');
			expect(paragraph).toBeInstanceOf(HTMLDivElement);
			expect(header.textContent).toBe('Test 1 reversed');
			expect(body.textContent).toBe('Test Description Reverse');
		});
	});
});
