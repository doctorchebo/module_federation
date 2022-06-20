import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ResetPassword from '..';

/**
 * @returns {React.Component} renders the ResetPassword component
 */
function customRender() {
	return render(<ResetPassword />, { wrapper: MemoryRouter });
}

describe('pages/resetPasswordPages/resetPassword', () => {
	describe('HTML structure', () => {
		test('should render reset password page', () => {
			const { container } = customRender();
			const root = container.querySelector('.reset-password');
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
	});
});
