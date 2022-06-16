import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../index';

describe('pages/about', () => {
	describe('Html structure', () => {
		it('Should render about', () => {
			const { container } = render(<About />);
			expect(container.firstChild).toBeInstanceOf(HTMLHeadingElement);
			expect(container.innerHTML).toBe('<h1>About</h1>');
		});
	});
});
