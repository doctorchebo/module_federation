import React from 'react';
import StatusFormComponent from '../index';
import { render } from '@testing-library/react';
import locale from 'pages/dashboard/components/eventsManager/locale/en.json';

const statusTypes = [
	{ key: 1, text: 'On Hold', value: 1 },
	{ key: 2, text: 'Complete', value: 2 },
	{ key: 3, text: 'In progress', value: 3 },
];

const statusTypeId = '123';

const comment = {
	comment: 'My comment',
	required: true,
	minLength: 0,
	maxLength: 10,
};

const { statusForm, statusErrorMessages } = locale;

/**
 * @param {props} props Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(props) {
	const { container } = render(<StatusFormComponent {...props} />);
	return container;
}

describe('pages/dashboard/sections/scholars/components/statusForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				comment: comment,
				statusTypes: statusTypes,
				statusForm: statusForm,
				statusFormAction: { title: 'test tittle', description: 'test description' },
				scholar: { User: 'John' },
				errorMessages: statusErrorMessages,
				statusTypeId: statusTypeId,
			});
			expect(root).not.toBeEmptyDOMElement();
		});
	});
});
