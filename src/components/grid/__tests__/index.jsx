import React from 'react';
import { render } from '@testing-library/react';
import Grid from '..';

describe('components/grid', () => {
	test('Should render by default', () => {
		const { container } = render(<Grid />);
		const root = container.querySelector('.grid');

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLElement);
	});
});
