import React from 'react';
import { render } from '@testing-library/react';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import RightSidebarStatus from '..';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

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
				onClearViewStack: jest.fn(),
			};
			return { state, actions };
		},
	};
});
describe('Tests in RightSideBarStatus Component', () => {
	const user = {
		id: '3fffc534-1d83-44d5-b264-1e17feabd322',
		User: 'Test user',
	};

	test('Should render RightSidebarStatus with default properties', () => {
		const { asFragment } = render(
			<Provider store={mockStoreConfig({})}>
				<RightSidebarStatus user={user} />
			</Provider>
		);
		expect(asFragment()).toBeDefined();
	});
});
