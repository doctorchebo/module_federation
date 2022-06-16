import React from 'react';
import { render } from '@testing-library/react';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import MainView from '..';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

jest.mock('store/eventsSlice/useEventStore', () => {
	return {
		useEventsStore: () => {
			const state = { viewStack: [], pagination: { currentPage: 0 } };
			const actions = {
				onGetEvents: jest.fn(),
				onSelectScholar: jest.fn(),
				onAddView: jest.fn(),
				onSearchEvent: jest.fn(),
				onGetUsersToNotify: jest.fn(),
			};
			return { state, actions };
		},
	};
});

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(
		<Provider store={mockStoreConfig({})}>
			<MainView {...properties} />
		</Provider>
	);

	return container;
}

describe('pages/dashboars/components/eventsManager/views', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test('Should render event form', async () => {
		const element = await customRender({
			user: { id: 1 },
			showFormEvent: true,
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
	});

	test('Should render status form', async () => {
		const element = await customRender({
			user: { id: 1 },
			showChangeStatusForm: true,
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
	});

	test('Should render attachment list', async () => {
		const element = await customRender({
			user: { id: 1 },
			showAttachmentList: true,
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
	});

	test('Should render event list', async () => {
		const element = await customRender({
			user: { id: 1 },
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
	});
});
