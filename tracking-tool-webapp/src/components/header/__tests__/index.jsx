import React from 'react';
import { render } from '@testing-library/react';
import Header from '..';

describe('components/Header', () => {
	test('Should render by default', () => {
		const { container } = render(<Header />);
		const root = container.querySelector('.header');

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLElement);
	});
});
