import React from 'react';
import ProgramVersionsForm from '..';
import { render, fireEvent, screen } from '@testing-library/react';
import locale from 'pages/dashboard/sections/programVersions/locale/en.json';
const trainers = [
	{
		id: '123',
		name: 'Edmund Gerhard',
	},
	{
		id: '223',
		name: 'Bernice Waters',
	},
	{
		id: '323',
		name: 'Emory Mughal',
	},
];
const stages = [
	{
		key: 1,
		text: 'Backend',
		value: 1,
		endDate: '12/12/21',
		startDate: '12/12/22',
		subjects: [
			{ key: 4, text: 'Mentoring', value: 4 },
			{ key: 5, text: 'C#', value: 5 },
		],
	},
	{
		key: 2,
		text: 'Frontend',
		value: 2,
		endDate: '12/12/21',
		startDate: '12/12/22',
		subjects: [
			{ key: 6, text: 'Mentoring', value: 6 },
			{ key: 7, text: 'React', value: 7 },
		],
	},
];
const { eventForm } = locale;
const programVersion = { version: 'dev31' };
const fieldSettings = {
	stageId: 10,
	subjectId: 20,
	trainerId: 30,
	renameVersion: '',
	stageEndDate: '',
	stageStartDate: '',
	endDate: '',
	onCancel: () => {},
	onSubmit: () => {},
	onChange: () => {},
	onSubjectChange: () => {},
	programVersionRename: programVersion.version,
	stages,
	trainers,
	errorMessages: locale.errorMessages,
	eventForm: locale.eventForm,
	eventFormAction: locale.eventForm.create,
};

/**
 * @param {object} properties Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(properties) {
	const { container } = render(<ProgramVersionsForm {...properties} />);
	return container;
}

/**
 *
 * @returns {HTMLElement} Returns an HTML Element
 */
function setup() {
	const root = customRender({ ...fieldSettings, eventFormAction: eventForm.create });
	return root;
}

describe('pages/dashboard/components/program.versions.form', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				...fieldSettings,
			});
			expect(root).not.toBeEmptyDOMElement();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
		test('Should render title and description', () => {
			const eventFormAction = {
				title: 'Program Version Update ' + programVersion.version,
				description: 'Get started by filling in the information below.',
			};
			const root = customRender({
				...fieldSettings,
				eventFormAction,
			});
			const title = root.querySelector('.title');
			const description = root.querySelector('.description');
			expect(title).toHaveTextContent(eventFormAction.title);
			expect(description).toHaveTextContent(eventFormAction.description);
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
	});

	describe('Event handlers', () => {
		test('Should no submit the evaluation when save button is clicked', () => {
			const onSubmitMock = jest.fn((value) => value);
			const container = setup();
			const saveButton = container.querySelector('button[type="submit"]');
			fireEvent.click(saveButton);
			expect(onSubmitMock).toBeCalledTimes(0);
		});
	});

	describe('When the RenameVersion field option is changed', () => {
		test('Should show an error if a value of less than 5 characters is enter', () => {
			const container = setup();
			const expectedError = 'Version must have at least 5 characters';
			let titleElement = container.querySelector('input[name="renameVersion"]');
			fireEvent.change(titleElement, { target: { value: 'new' } });
			expect(titleElement).toHaveValue('new');
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Should show an error if a value of more than 15 characters is enter', () => {
			const container = setup();
			const valueRepeat = 16;
			const expectedError = 'Version must not have more than 15 characters';
			let titleElement = container.querySelector('input[name="renameVersion"]');
			fireEvent.change(titleElement, { target: { value: 'a'.repeat(valueRepeat) } });
			expect(titleElement).toHaveValue('a'.repeat(valueRepeat));
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Should show an error if an empty value is enter', () => {
			const container = setup();
			let titleElement = container.querySelector('input[name="renameVersion"]');
			fireEvent.change(titleElement, { target: { value: '' } });
			expect(titleElement).toHaveValue('');
		});
	});

	describe('When the RenameStage field option is changed', () => {
		test('Should show an error if a value of less than 5 characters is enter', () => {
			const container = setup();
			const expectedError = 'Stage must have at least 5 characters';
			let titleElement = container.querySelector('input[name="renameStage"]');
			fireEvent.change(titleElement, { target: { value: 'new' } });
			expect(titleElement).toHaveValue('new');
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Should show an error if a value of more than 15 characters is enter', () => {
			const container = setup();
			const expectedError = 'Stage must not have more than 15 characters';
			let titleElement = container.querySelector('input[name="renameStage"]');
			fireEvent.change(titleElement, { target: { value: 'a'.repeat(16) } });
			expect(titleElement).toHaveValue('a'.repeat(16));
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
	});

	describe('When the RenameSubject field option is changed', () => {
		test('Should show an error if a value of less than 5 characters is enter', () => {
			const container = setup();
			const expectedError = 'Subject must have at least 5 characters';
			let titleElement = container.querySelector('input[name="renameSubject"]');
			fireEvent.change(titleElement, { target: { value: 'new' } });
			expect(titleElement).toHaveValue('new');
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
		test('Should show an error if a value of more than 15 characters is enter', () => {
			const container = setup();
			const expectedError = 'Subject must not have more than 15 characters';
			let titleElement = container.querySelector('input[name="renameSubject"]');
			fireEvent.change(titleElement, { target: { value: 'a'.repeat(16) } });
			expect(titleElement).toHaveValue('a'.repeat(16));
			let errorElement = container.querySelector('div[class="ui error visible message"]');
			expect(errorElement).toHaveTextContent(expectedError);
		});
	});

	describe('When the Stage field option is changed or someone option is selected', () => {
		test('Should set to null the option selected of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector('div[name="subjectId"]');
			expect(subjectElement).toHaveTextContent('Choose a subject');
		});
		test('Should set the options of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector(
				'div[name="subjectId"] div[class="menu transition"]'
			);
			const optionElement = screen.getByText('Frontend');
			fireEvent.click(optionElement);
			expect(subjectElement).toHaveTextContent('React');
			expect(subjectElement).not.toHaveTextContent('C#');
		});
	});

	describe('When the Subject field option is changed or someone option is selected', () => {
		test('Should set to null the option selected of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector('div[name="trainerId"]');
			expect(subjectElement).toHaveTextContent('Choose a trainer');
		});
		test('Should set the options of the Subject Field', () => {
			const container = setup();
			let subjectElement = container.querySelector(
				'div[name="trainerId"] div[class="menu transition"]'
			);
			const optionElement = screen.getByText('Frontend');
			fireEvent.click(optionElement);
			expect(subjectElement).not.toHaveTextContent('C#');
		});
	});
});
