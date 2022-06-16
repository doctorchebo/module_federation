import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VerifyEmailForm from '..';
import locale from 'pages/resetPasswordPages/locale/en.json';

const modelTest = { email: 'something@gmail.com' };

const props = { model: modelTest, locale: locale.verifyEmailPage.verifyEmail, onSubmit: jest.fn() };

/**
 * @param {object} properties Properties
 * @returns {React.Component} renders the VerifyEmailForm page
 */
function customRender(properties) {
	return render(<VerifyEmailForm {...properties} />);
}

describe('pages/resetPasswordPages/verifyEmailForm', () => {
	describe('HTML structure', () => {
		test('should render reset password form', () => {
			const { container } = customRender(props);
			const root = container.querySelector('.verify-form');
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLFormElement);
		});
	});

	describe('Business logic', () => {
		test('should show a format message error when email is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelector('input');
			fireEvent.change(input, { target: { value: 'email' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(
				locale.verifyEmailPage.verifyEmail.errorMessages.email.format
			);
		});

		test('should trigger submit when the reset password button is clicked', () => {
			const { container } = customRender(props);
			const button = container.querySelector('#submit-button');
			const input = container.querySelector('input');
			fireEvent.change(input, { target: { value: modelTest.email } });
			fireEvent.click(button);
			expect(props.onSubmit).toBeCalled();
		});
	});
});
