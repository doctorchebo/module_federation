import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UpdateCandidateForm from '..';
import { MemoryRouter } from 'react-router-dom';
import locale from 'pages/dashboard/sections/candidates/locale/en.json';

const mockApplicationAction = {
	onHideSidebar: jest.fn(),
};

const properties = {
	onSubmit: jest.fn(),
	actions: mockApplicationAction,
	value: {
		person: {
			fullName: '',
			personalEmail: '',
			phoneNumber: 0,
		},
		programVersionName: 'Dev33',
		profile: {
			pathResume: 'www.gitlab.com',
		},
		activity: {
			activityType: {
				description: 'Postulation',
			},
		},
		postulation: {
			approved: true,
		},
	},
	title: 'Update Candidate',
};

/**
 * @param {object} properties Properties
 * @returns {*} renders the UpdateCandidateForm component
 */
function renderComponent(properties) {
	return render(<UpdateCandidateForm {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('dashboard/sections/candidates/components/UpdateCandidateForm', () => {
	describe('HTML structure', () => {
		test('should render the update candidate form', () => {
			const { container } = renderComponent(properties);
			expect(container).not.toBeEmptyDOMElement();
			expect(container.querySelector('.update-candidate-form')).not.toBeNull();
			expect(container.querySelector('.button-back')).not.toBeNull();
			expect(container.querySelector('[type="submit"]')).not.toBeNull();
		});
		test('should have the fullName field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="fullName"]')).not.toBeNull();
		});
		test('should have the phoneNumber field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="phoneNumber"]')).not.toBeNull();
		});
		test('should have the email field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="personalEmail"]')).not.toBeNull();
		});
		test('should be enabled the submit button', () => {
			const customProperties = Object.assign({}, properties);
			customProperties.value.person.personalEmail = 'email@fundacion-jala.org';
			customProperties.value.person.fullName = 'fullName';
			customProperties.value.person.phoneNumber = '77777777';

			const { container } = renderComponent(customProperties);
			expect(container.querySelector('[type="submit"]')).not.toHaveAttribute('');
		});
	});

	describe('When the fullName field value change', () => {
		test('should show an error when the value is less than 4 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const fullNameField = container.querySelector('[name="fullName"]');
			fireEvent.change(fullNameField, { target: { value } });
			expect(fullNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.fullName.minLength.replace('%s', 4)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const fullNameField = container.querySelector('[name="fullName"]');
			fireEvent.change(fullNameField, { target: { value } });
			expect(fullNameField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.fullName.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the phoneNumber field value change', () => {
		test('should show an error when the value is less than 7 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.phoneNumber.format
			);
		});
		test('should show an error when the value is more than 15 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.phoneNumber.format
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
				locale.updateCandidateForm.errorMessages.phoneNumber.format
			);
		});
	});
	describe('When the email field value change', () => {
		test('should show an error when the value is less than 7 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="personalEmail"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.email.minLength.replace('%s', 7)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="personalEmail"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.email.maxLength.replace('%s', 255)
			);
		});
		test('should show an error when the value is not an email', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="personalEmail"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				locale.updateCandidateForm.errorMessages.email.emailFormat
			);
		});
	});
});
