import React from 'react';
import { render } from '@testing-library/react';
import Radio from '..';

describe('components/radio', () => {
	test('Should render by default', () => {
		const { container } = render(<Radio />);
		const root = container.querySelector('.radio');

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLElement);
	});
});
