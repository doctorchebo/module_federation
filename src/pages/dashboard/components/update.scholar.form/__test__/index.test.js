import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import locale from 'pages/dashboard/sections/scholars/locale/en.json';
import UpdateScholarForm from '..';
import '@testing-library/jest-dom/extend-expect';

const mockApplicationAction = {
	onHideSidebar: jest.fn(),
};

const properties = {
	onSubmit: jest.fn(),
	actions: mockApplicationAction,
	value: {
		fullName: '',
		university: '',
		career: '',
		academicDegree: '',
		currentCity: '',
		id: 0,
		extension: '',
		personalEmail: '',
	},
	title: 'Update Scholar',
};

const errorMessages = locale.updateScholarForm.errorMessages;

/**
 * @param {object} properties Properties
 * @returns {*} renders the UpdateUserForm component
 */
function renderComponent(properties) {
	return render(<UpdateScholarForm {...properties} />, {
		wrapper: MemoryRouter,
	});
}

describe('dashboard/sections/users/components/UpdateScholarForm', () => {
	describe('HTML structure', () => {
		test('should render the update scholar form', () => {
			const { container } = renderComponent(properties);
			expect(container).not.toBeEmptyDOMElement();
			expect(container.querySelector('.update-scholar-form')).not.toBeNull();
			expect(container.querySelector('.button-back')).not.toBeNull();
			expect(container.querySelector('[type="submit"]')).not.toBeNull();
		});
		test('should have the email field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="email"]').type).toBe('text');
		});
		test('should have the phoneNumber field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="phoneNumber"]').type).toBe('text');
		});
		test('should have the currentCity field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="currentCity"]').type).toBe('text');
		});
		test('should have the university field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="university"]').type).toBe('text');
		});
		test('should have the career field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="career"]').type).toBe('text');
		});
		test('should have the degree field', () => {
			const { container } = renderComponent(properties);
			expect(container.querySelector('[name="degree"]').type).toBe('text');
		});
	});

	describe('When the email field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 'x';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.email.minLength.replace('%s', 2));
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 'x'.repeat(256);
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				errorMessages.email.maxLength.replace('%s', 255)
			);
		});
		test('should show an error when the value is not an email', () => {
			const value = 'test';
			const { container } = renderComponent(properties);
			const emailField = container.querySelector('[name="email"]');
			fireEvent.change(emailField, { target: { value } });
			expect(emailField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.email.emailFormat);
		});
	});

	describe('When the phoneNumber field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 'x';
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.phoneNumber.format);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 'x'.repeat(256);
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.phoneNumber.format);
		});
		test('should show an error when the value is not a number', () => {
			const value = 'x';
			const { container } = renderComponent(properties);
			const phoneNumberField = container.querySelector('[name="phoneNumber"]');
			fireEvent.change(phoneNumberField, { target: { value } });
			expect(phoneNumberField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.phoneNumber.format);
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
				errorMessages.currentCity.minLength.replace('%s', 2)
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
				errorMessages.currentCity.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the university field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const universityField = container.querySelector('[name="university"]');
			fireEvent.change(universityField, { target: { value } });
			expect(universityField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				errorMessages.university.minLength.replace('%s', 2)
			);
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const universityField = container.querySelector('[name="university"]');
			fireEvent.change(universityField, { target: { value } });
			expect(universityField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				errorMessages.university.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the career field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const careerField = container.querySelector('[name="career"]');
			fireEvent.change(careerField, { target: { value } });
			expect(careerField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.career.minLength.replace('%s', 2));
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const careerField = container.querySelector('[name="career"]');
			fireEvent.change(careerField, { target: { value } });
			expect(careerField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				errorMessages.career.maxLength.replace('%s', 255)
			);
		});
	});

	describe('When the degree field value change', () => {
		test('should show an error when the value is less than 2 characters', () => {
			const value = 's';
			const { container } = renderComponent(properties);
			const degreeField = container.querySelector('[name="degree"]');
			fireEvent.change(degreeField, { target: { value } });
			expect(degreeField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(errorMessages.degree.minLength.replace('%s', 2));
		});
		test('should show an error when the value is more than 255 characters', () => {
			const value = 's'.repeat(256);
			const { container } = renderComponent(properties);
			const degreeField = container.querySelector('[name="degree"]');
			fireEvent.change(degreeField, { target: { value } });
			expect(degreeField).toHaveValue(value);
			const errorMessage = container.querySelector('[class="ui error visible message"]');
			expect(errorMessage).toHaveTextContent(
				errorMessages.degree.maxLength.replace('%s', 255)
			);
		});
	});
});
