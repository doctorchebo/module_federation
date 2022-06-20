import React from 'react';
import { render } from '@testing-library/react';
import Input from '..';

describe('components/Input', () => {
	test('Should render by default', () => {
		const { container } = render(<Input />);
		const root = container.querySelector('.input');

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLElement);
	});
});
