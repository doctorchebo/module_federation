import React from 'react';
import { render } from '@testing-library/react';
import { InputLogin } from './index';

describe('Testing Input component', () => {
	it('Should render input element with default properties', () => {
		const { container } = render(<InputLogin placeholder='Username' type='password' />);
		const input = container.querySelector('input');
		expect(container).toBeInstanceOf(HTMLDivElement);
		expect(input).toBeInstanceOf(HTMLInputElement);
		expect(input).toBeInvalid();
		expect(input).toBeRequired();
	});

	it('should render with a default icon', () => {
		const { container } = render(<InputLogin placeholder='username' type='password' />);
		const icon = container.querySelector('.ico');
		expect(icon).toBeDefined();
	});

	it('Should render with a type text by default', () => {
		const { container } = render(<InputLogin placeholder='username' />);
		const Input = container.querySelector('input');
		expect(Input?.type).toBe('text');
	});
});
