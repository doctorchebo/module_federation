import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import EventFormComponent from '../index';
import locale from 'pages/dashboard/components/evaluationManager/locale/en.json';

const { subjectForm, errorMessagesSubject } = locale;
const grades = [
	{ key: 1, text: 'A', value: 1 },
	{ key: 2, text: 'B', value: 2 },
];
const fieldValues = {
	gradeId: 1,
	comment: 'This form is a component',
	isPublished: 'False',
};

const fieldSettings = {
	errorMessages: errorMessagesSubject,
	eventForm: subjectForm,
	grades,
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
describe('pages/dashboard/components/evaluationManager/components/eventForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				...fieldSettings,
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
			const root = customRender({ ...fieldSettings });
			return root;
		};
		test('should all fields have the initial default values', () => {
			const container = setup();
			const gradeIdField = container.querySelector('div[name="gradeId"] div');
			expect(gradeIdField).toHaveTextContent('Choose a grade');
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
	describe('When the form is to update an evaluation', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
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
	});

	describe('When the Grade field option is changed or someone option is selected', () => {
		const setup = () => {
			const root = customRender({
				...fieldSettings,
				...fieldValues,
			});
			return root;
		};
		test('Should set to null the option selected of the Grade Field', () => {
			const container = setup();
			let gradeElement = container.querySelector('div[name="gradeId"]');
			const optionElement = screen.getByText('B');
			fireEvent.click(optionElement);
			expect(gradeElement).toHaveTextContent('BAB');
		});
	});
});
