import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import VerifyEmail from '..';

/**
 * @returns {React.Component} renders the VerifyEmail page
 */
function customRender() {
	return render(<VerifyEmail />, { wrapper: MemoryRouter });
}

describe('pages/resetPasswordPages/verifyEmail', () => {
	describe('HTML structure', () => {
		test('should render verify email page', () => {
			const { container } = customRender();
			const root = container.querySelector('.reset-password');
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
	});
});
