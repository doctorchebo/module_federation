/* eslint-disable jest/no-commented-out-tests */
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import EventFormComponent from '../index';
import locale from '../../../locale/en.json';

const notificationUsers = [
	{ key: '1', text: 'Test1 Test1', value: '1', name: '1' },
	{ key: '2', text: 'Test2 Test2', value: '2', name: '2' },
	{ key: '3', text: 'Test3 Test3', value: '3', name: '3' },
];
const eventTypes = [
	{ key: 1, text: 'Informational', value: 1 },
	{ key: 2, text: 'Incident', value: 2 },
	{ key: 3, text: 'Accomplishment', value: 3 },
];
const stages = [
	{
		key: 1,
		text: 'Backend',
		value: 1,
		subjects: [
			{ key: 1, text: 'Mentoring', value: 1 },
			{ key: 2, text: 'C#', value: 2 },
		],
	},
	{
		key: 2,
		text: 'Frontend',
		value: 2,
		subjects: [
			{ key: 3, text: 'Mentoring', value: 3 },
			{ key: 4, text: 'React', value: 4 },
		],
	},
];
const { eventForm, errorMessages } = locale;
const fieldValues = {
	notifyTo: ['1', '2'],
	eventTypeId: 1,
	stageId: 1,
	subjectId: 1,
	title: 'My Form',
	description: 'This form is a component',
};
const scholar = { person: { fullName: 'John Doe' } };
const fieldSettings = {
	notificationUsers,
	eventTypes,
	stages,
	eventForm,
	errorMessages,
	scholar,
	title: '',
	description: '',
	onCancel: () => {},
	onSubmit: () => {},
	onAttach: () => {},
	onShare: () => {},
	onChangeUsersToNotify: () => {},
	onGetSelectedUsers: () => {},
};
/**
 * @param {props} props Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(props) {
	const { container } = render(<EventFormComponent {...props} />);
	return container;
}
describe('pages/dashboard/components/eventsManager/components/eventForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				...fieldSettings,
				eventFormAction: eventForm.create,
				usersList: [],
				eventTypes: [],
				stages: [],
				scholar: { User: 'John' },
			});
			expect(root).not.toBeEmptyDOMElement();
		});
	});
	describe('When the form is to create an event', () => {
		const setup = () => {
			const root = customRender({ ...fieldSettings, eventFormAction: eventForm.create });
			return root;
		};
		test('should all fields have the initial default values', () => {
			const container = setup();
			const notifyToField = container.querySelector('div[name="notifyTo"] div');
			const eventTypeField = container.querySelector('div[name="eventTypeId"] div');
			const stageField = container.querySelector('div[name="stageId"] div');
			const subjectField = container.querySelector('div[name="subjectId"] div');
			const titleField = container.querySelector('input[name="title"]');
			const descriptionField = container.querySelector('.content-rich-text');
			expect(notifyToField).toHaveTextContent('Type username');
			expect(eventTypeField).toHaveTextContent('Choose a event type');
			expect(stageField).toHaveTextContent('Choose a stage');
			expect(subjectField).toHaveTextContent('Choose a subject');
			expect(titleField).toHaveTextContent('');
			expect(descriptionField).toBeDefined();
		});
		test('Should not show any message error at the beginning', () => {
			const container = setup();
			const errorElements = container.querySelectorAll(
				'div[class="ui error visible message"]'
			);
			expect(errorElements).toHaveLength(0);
		});
		test('Should be disabled the submit button at the beginning', () => {
			const container = setup();
			const buttonSaveElement = container.querySelector('button[type="submit"]');
			expect(buttonSaveElement).toBeDisabled();
		});
		test('Should have the title and description to create an event', () => {
			const container = setup();
			const headerElement = container.querySelector('.title');
			const descriptionElement = container.querySelector('.description');
			const expectedTitle = eventForm.create.title.replace('%s', scholar.person.fullName);
			const expectedDescription = eventForm.create.description;
			expect(headerElement).toHaveTextContent(expectedTitle);
			expect(descriptionElement).toHaveTextContent(expectedDescription);
		});
	});
	describe('When the form is to update an event', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
				eventFormAction: eventForm.update,
			});
			return root;
		};
		test('"Shouldn\'t show any message error at the beginning"', () => {
			const container = setup();
			const errorElements = container.querySelectorAll(
				'div[class="ui error visible message"]'
			);
			expect(errorElements).toHaveLength(0);
		});
		test('Should have the title and description to update an event', () => {
			const container = setup();
			const headerElement = container.querySelector('.title');
			const descriptionElement = container.querySelector('.description');
			const expectedTitle = eventForm.update.title.replace('%s', scholar.person.fullName);
			const expectedDescription = eventForm.update.description;
			expect(headerElement).toHaveTextContent(expectedTitle);
			expect(descriptionElement).toHaveTextContent(expectedDescription);
		});
	});
	describe('Notify to users for events', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
				eventFormAction: eventForm.create,
			});
			return root;
		};
		test('should add a user to NotifyTo component', () => {
			const container = setup();
			const optionElement = container.querySelector('div[name="notifyTo"] .item[name="3"]');
			let userSelected = container.querySelector('div[name="notifyTo"] .label[name="3"]');
			expect(userSelected).toBeNull();
			fireEvent.click(optionElement);
			userSelected = container.querySelector('div[name="notifyTo"] .label[name="3"]');
			expect(userSelected).not.toBeNull();
		});
		test('should remove a user to NotifyTo component', () => {
			const container = setup();
			const deleteElement = container.querySelector('.label[name="1"] i.delete');
			let userSelected = container.querySelector('div[name="notifyTo"] .label[name="1"]');
			expect(userSelected).not.toBeNull();
			fireEvent.click(deleteElement);
			userSelected = container.querySelector('div[name="notifyTo"] .label[name="1"]');
			expect(userSelected).toBeNull();
		});
	});
	describe('When the Stage field option is changed or someone option is selected', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
				eventFormAction: eventForm.update,
			});
			return root;
		};
		test('Should set to null the option selected of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector('div[name="subjectId"]');
			const optionElement = screen.getByText('Frontend');
			expect(subjectElement).toHaveTextContent('Mentoring');
			fireEvent.click(optionElement);
			expect(subjectElement).toHaveTextContent('Choose a subject');
		});
		test('Should set the options of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector(
				'div[name="subjectId"] div[class="menu transition"]'
			);
			expect(subjectElement).toHaveTextContent('C#');
			expect(subjectElement).not.toHaveTextContent('React');
			const optionElement = screen.getByText('Frontend');
			fireEvent.click(optionElement);
			expect(subjectElement).toHaveTextContent('React');
			expect(subjectElement).not.toHaveTextContent('C#');
		});
	});
	describe('When the Title field value is changed', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
				eventFormAction: eventForm.update,
			});
			return root;
		};
		test('Given a value of less than 5 characters should show an error', () => {
			const container = setup();
			const expectedError = 'Title must have at least 5 characters';
			let titleElement = container.querySelector('input[name="title"]');
			expect(titleElement).toHaveValue('My Form');
			fireEvent.change(titleElement, { target: { value: 'new' } });
			expect(titleElement).toHaveValue('new');
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Given a value of more than 30 characters should show an error', () => {
			const container = setup();
			const expectedError = 'Title must not have more than 30 characters';
			let titleElement = container.querySelector('input[name="title"]');
			expect(titleElement).toHaveValue('My Form');
			fireEvent.change(titleElement, { target: { value: 'a'.repeat(31) } });
			expect(titleElement).toHaveValue('a'.repeat(31));
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Given an empty value should show an error', () => {
			const container = setup();
			const expectedError = 'Title is required';
			let titleElement = container.querySelector('input[name="title"]');
			expect(titleElement).toHaveValue('My Form');
			fireEvent.change(titleElement, { target: { value: '' } });
			expect(titleElement).toHaveValue('');
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
	});
	describe('When the Description field value is changed on update event form', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
				eventFormAction: eventForm.update,
			});
			return root;
		};
		test('Given a value of less than 10 characters should show an error', () => {
			const container = setup();
			const expectedError = 'Description must have at least 10 characters';
			let descriptionElement = container.querySelector('.public-DraftStyleDefault-block');
			expect(descriptionElement).toHaveTextContent('This form is a component');
			fireEvent.change(descriptionElement, {
				target: { textContent: 'This is a description changed' },
			});
			expect(descriptionElement).toHaveTextContent('This is a description changed');
			fireEvent.change(descriptionElement, {
				target: { textContent: 'Other' },
			});
			let errorElement = container.querySelector('.ui .content .list .content');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Given an empty value should show an error', () => {
			const container = setup();
			const expectedError = 'Something is wrong!';
			let descriptionElement = container.querySelector('.public-DraftStyleDefault-block');
			expect(descriptionElement).toHaveTextContent('This form is a component');
			fireEvent.change(descriptionElement, { target: { textContent: '' } });
			expect(descriptionElement).toHaveTextContent('');
			let errorElement = container.querySelector('.ui .content .header');
			expect(errorElement).toHaveTextContent(expectedError);
		});
	});
});
