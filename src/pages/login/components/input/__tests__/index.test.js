import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputLogin } from '../index';

describe('pages/login/components/input', () => {
	describe('Html structure', () => {
		it('Should render input', () => {
			const { container } = render(<InputLogin />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
			expect(container.firstChild.childNodes).toHaveLength(1);
		});
	});

	describe('Business logic', () => {
		let validateMock = jest.fn();

		afterEach(() => {
			validateMock.mockReset();
		});

		it('On Change should be triggered', () => {
			const { container } = render(<InputLogin validate={validateMock()} />);
			const input = container.querySelector('.ui.fluid.input');
			fireEvent.change(input, { target: { data: 'Testing' } });
			expect(input.data).toBe('Testing');
			expect(validateMock).toHaveBeenCalled();
		});

		it('On Change should be triggered to a empty string', () => {
			const { container } = render(<InputLogin validate={validateMock()} />);
			const input = container.querySelector('.ui.fluid.input');
			fireEvent.change(input, { target: { data: 'Testing' } });
			fireEvent.change(input, { target: { data: '' } });
			expect(input.data).toBe('');
			expect(validateMock).toHaveBeenCalled();
		});
	});
});
