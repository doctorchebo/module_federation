import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResetPasswordForm from '..';
import locale from 'pages/resetPasswordPages/locale/en.json';
import localePassword from 'helpers/locale/en.json';

const modelTest = {
	code: 'SD1SE3',
	newPassword: 'Admin123$$',
	confirmPassword: 'Admin123$$',
};

const props = {
	model: modelTest,
	locale: locale.resetPasswordPage.resetPassword,
	onSubmit: jest.fn(),
};

/**
 * @param {object} properties Properties
 * @returns {React.Component} renders the ResetPasswordForm component
 */
function customRender(properties) {
	return render(<ResetPasswordForm {...properties} />);
}

describe('pages/resetPasswordPages/resetPasswordForm', () => {
	describe('HTML structure', () => {
		test('should render reset password form', () => {
			const { container } = customRender(props);
			const root = container.querySelector('.change-password-form');
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLFormElement);
		});
	});

	/* eslint-disable max-len */
	describe('Business logic', () => {
		test('should show a message error when code is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelector('input');
			fireEvent.change(input, { target: { value: 'code' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(
				locale.resetPasswordPage.resetPassword.errorMessages.code.format.replace('%s', 6)
			);
		});

		test('should show a less than message error when new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[1];
			fireEvent.change(input, { target: { value: 'newPass' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.lengthError);
		});

		test('should show a requires lowercase character message error when new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[1];
			fireEvent.change(input, { target: { value: 'NEWPASS1234' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.lowercase);
		});

		test('should show a requires uppercase character message error when new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[1];
			fireEvent.change(input, { target: { value: 'password1234' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.uppercase);
		});

		test('should show a requires special character message error when new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[1];
			fireEvent.change(input, { target: { value: 'nPassword1234' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.symbolError);
		});

		test('should show a requires number message error when new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[1];
			fireEvent.change(input, { target: { value: 'newPassword#' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.number);
		});

		test('should show a less than message error when repeat new password is typed', () => {
			const { container } = customRender(props);
			const input = container.querySelectorAll('input')[2];
			fireEvent.change(input, { target: { value: 'repeat' } });
			const errorsContainer = container.querySelector('[class="ui error visible message"]');
			expect(errorsContainer).toBeDefined();
			expect(errorsContainer).toHaveTextContent(localePassword.passwordValidator.lengthError);
		});

		test('should trigger submit when the reset password button is clicked', () => {
			const { container } = customRender(props);
			const button = container.querySelector('#submit-button');
			const inputs = container.querySelectorAll('input');
			const inputCode = inputs[0];
			const inputNewPassword = inputs[1];
			const inputRepeatPassword = inputs[2];

			fireEvent.change(inputCode, { target: { value: modelTest.code } });
			fireEvent.change(inputNewPassword, { target: { value: modelTest.newPassword } });
			fireEvent.change(inputRepeatPassword, { target: { value: modelTest.newPassword } });
			fireEvent.click(button);
			expect(props.onSubmit).toBeCalled();
		});
	});
});
