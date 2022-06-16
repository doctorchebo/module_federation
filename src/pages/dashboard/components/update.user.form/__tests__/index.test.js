import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UpdateUserForm from '..';
import { MemoryRouter } from 'react-router-dom';
import locale from 'pages/dashboard/sections/users/locale/en.json';

const mockApplicationAction = {
	onHideSidebar: jest.fn(),
};

const properties = {
	onSubmit: jest.fn(),
	actions: mockApplicationAction,
	roles: [
		{
			id: 0,
			name: '',
			description: '',
		},
	],
	value: {
		firstName: '',
		lastName: '',
		email: '',
		ci: 0,
		phoneNumber: 0,
		currentCity: '',
		roles: [
			{
				id: 0,
				name: '',
				description: '',
			},
		],
	},
	title: 'Update user',
};

/**
 * @param {object} properties Properties
 * @returns {*} renders the UpdateUserForm component
 */
function renderComponent(properties) {
	return render(<UpdateUserForm {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('dashboard/sections/users/components/UpdateUserForm', () => {
	describe('HTML structure', () => {
		test('should render the update user form', () => {
			const { container } = renderComponent(properties);
			expect(container).not.toBeEmptyDOMElement();
			expect(container.querySelector('.update-user-form')).not.toBeNull();
			expect(container.querySelector('.button-back')).not.toBeNull();
			expect(container.querySelector('[type="submit"]')).not.toBeNull();
		});
		test('should have the firstName field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="firstName"]')).not.toBeNull();
		});
		test('should have the lastName field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="lastName"]')).not.toBeNull();
		});
		test('should have the ci field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="ci"]')).not.toBeNull();
		});
		test('should have the issued field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="issued"]')).not.toBeNull();
		});
		test('should have the currentCity field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="currentCity"]')).not.toBeNull();
		});
		test('should have the phoneNumber field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="phoneNumber"]')).not.toBeNull();
		});
		test('should have the email field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="email"]')).not.toBeNull();
		});
		test('should have the roles field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="role"]')).not.toBeNull();
		});
		test('should be enabled the submit button', () => {
			const role = {
				id: '28c4290b-747c-41a4-802d-2cfdd6265a23',
				name: 'role name',
				description: '',
			};
			const customProperties = Object.assign({}, properties);
			customProperties.roles[0] = role;
			customProperties.value.ci = '12345';
			customProperties.value.currentCity = 'currentCity';
			customProperties.value.email = 'email@fundacion-jala.org';
			customProperties.value.firstName = 'firstName';
			customProperties.value.lastName = 'lastName';
			customProperties.value.phoneNumber = '77777777';
			customProperties.value.issued = 'TEST';
			customProperties.value.roles[0] = role;

			const { container } = renderComponent(customProperties);
			expect(container.querySelector('[type="submit"]')).not.toHaveAttribute('disabled');
		});
	});

	describe('When the firstName field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const firstNameField = container.querySelector('[name="firstName"]');
			fireEvent.change(firstNameField, { target: { value } });
			expect(firstNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.firstName.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const firstNameField = container.querySelector('[name="firstName"]');
			fireEvent.change(firstNameField, { target: { value } });
			expect(firstNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.firstName.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the lastName field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const lastNameField = container.querySelector('[name="lastName"]');
			fireEvent.change(lastNameField, { target: { value } });
			expect(lastNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.lastName.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const lastNameField = container.querySelector('[name="lastName"]');
			fireEvent.change(lastNameField, { target: { value } });
			expect(lastNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.lastName.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the ci field value change', () => {
		test('should show an error when the value is less than 5 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const ciField = container.querySelector('[name="ci"]');
			fireEvent.change(ciField, { target: { value } });
			expect(ciField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.ci.minLength.replace('%s', 5)
			);
		});
		test('should show an error when the value is more than 10 characters', () => {
			const value = 's'.repeat(11);
			const { container } = renderComponent(properties);
			const ciField = container.querySelector('[name="ci"]');
			fireEvent.change(ciField, { target: { value } });
			expect(ciField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.ci.maxLength.replace('%s', 10)
			);
		});
	});

	describe('When the issued field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const issuedField = container.querySelector('[name="issued"]');
			fireEvent.change(issuedField, { target: { value } });
			expect(issuedField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.issued.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 4 characters', () => {
			const value = 's'.repeat(5);
			const { container } = renderComponent(properties);
			const issuedField = container.querySelector('[name="issued"]');
			fireEvent.change(issuedField, { target: { value } });
			expect(issuedField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.issued.maxLength.replace('%s', 4)
			);
		});
	});

	describe('When the currentCity field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const currentCityField = container.querySelector('[name="currentCity"]');
			fireEvent.change(currentCityField, { target: { value } });
			expect(currentCityField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.currentCity.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const currentCityField = container.querySelector('[name="currentCity"]');
			fireEvent.change(currentCityField, { target: { value } });
			expect(currentCityField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.currentCity.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the phoneNumber field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.phoneNumber.format
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.phoneNumber.format
			);
		});
		test('should show an error when the value is not a number', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.phoneNumber.format
			);
		});
	});
	describe('When the email field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.email.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.email.maxLength.replace('%s', 255)
			);
		});
		test('should show an error when the value is not an email', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateUserForm.errorMessages.email.emailFormat
			);
		});
	});
});
