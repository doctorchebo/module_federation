import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import EventManager from '..';
import { MESSAGE_ERROR } from 'helpers/constants';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);
const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

const mockLoginState = { errorMessages: [MESSAGE_ERROR], isLoggedIn: true, sidebarHistory: [] };
const mockLoginAction = { onLogout: jest.fn(), onNotificationsLoad: jest.fn() };

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});
jest.mock('store/eventsSlice/useEventStore', () => {
	return {
		useEventsStore: () => {
			const state = {
				viewStack: ['test view 1', 'test view 2'],
				pagination: {
					currentPage: '0',
				},
			};
			console.log(state);
			const actions = {
				onSelectScholar: jest.fn(),
				onSearchEvent: jest.fn(),
				onAddView: jest.fn(),
			};
			return { state, actions };
		},
	};
});

describe('pages/dashboard/components/eventsManager/', () => {
	it('Should render by default', () => {
		const user = {};
		const event = {};
		const { container } = renderWithRouter(
			<Provider store={mockStoreConfig({})}>
				<EventManager user={user} event={event} />
			</Provider>
		);
		expect(container).toBeDefined();
	});
});
