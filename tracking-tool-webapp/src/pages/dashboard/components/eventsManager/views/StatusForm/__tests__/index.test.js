import React from 'react';
import { render } from '@testing-library/react';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import locale from 'pages/dashboard/components/eventsManager/locale/en.json';
import StatusFormComponent from '../index';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);
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

jest.mock('store/eventsSlice/useEventStore', () => {
	return {
		useEventsStore: () => {
			const scholar = { person: { fullName: 'John Doe' } };
			const state = { eventTypes: [], selectedScholar: scholar };
			const actions = {
				onPopView: jest.fn(),
				onUpdateChangeStatus: jest.fn(),
				onGetStatus: jest.fn(),
			};
			return { state, actions };
		},
	};
});

/**
 * @param {props} props Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(props) {
	const { container } = render(
		<Provider store={mockStoreConfig({})}>
			<StatusFormComponent {...props} />
		</Provider>
	);
	return container;
}

describe('pages/dashboard/sections/scholars/components/statusForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				comment: comment,
				statusTypes: statusTypes,
				statusForm: statusForm,
				scholar: { User: 'John' },
				errorMessages: statusErrorMessages,
				statusTypeId: statusTypeId,
			});

			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
			expect(root.firstChild.classList.contains('event-header')).toBeTruthy();
		});
	});
});
