import React from 'react';
import { render } from '@testing-library/react';
import Form from '..';

describe('components/Form', () => {
	test('Should render by default', () => {
		const { container } = render(<Form />);
		const root = container.querySelector('.form');

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLElement);
	});
});
