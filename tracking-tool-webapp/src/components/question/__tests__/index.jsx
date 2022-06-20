import React from 'react';
import { render } from '@testing-library/react';
import Question from '..';

/**
 * Render a Question component
 *
 * @param {*} props Properties
 * @returns {*} a Approval list to test
 */
function customRender(props) {
	const { container } = render(<Question {...props} />);
	return container;
}

describe('components/question', () => {
	describe('HTML structure', () => {
		it('Should render Question with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.firstChild).toBeInstanceOf(HTMLElement);
		});
	});
});
