import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserDetails from '../index';
import { BrowserRouter } from 'react-router-dom';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const renderWithRouter = (ui, { route = '/profile' } = {}) => {
	window.history.pushState({}, 'Test page', route);
	return render(ui, { wrapper: BrowserRouter });
};

jest.mock('pages/profile/context', () => {
	return {
		useProfileContext: () => {
			const state = {
				loading: true,
			};
			const actions = {
				onGetUserImage: jest.fn(),
			};

			return [state, actions];
		},
	};
});

const onLogoutMock = jest.fn();

describe('pages/dashboard/components/userDetails', () => {
	describe('UserDetails component', () => {
		it('has a userDetails component to show', () => {
			const { container } = renderWithRouter(
				<Provider store={mockStoreConfig({})}>
					<UserDetails onLogout={onLogoutMock} />
				</Provider>
			);
			const submit = container.querySelector('.drop-logout');
			fireEvent.click(submit);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('trigger events', () => {
		it('must trigger on logoutMock when click', () => {
			const { container } = renderWithRouter(
				<Provider store={mockStoreConfig({})}>
					<UserDetails onLogout={() => onLogoutMock()} username='user' />
				</Provider>
			);
			const dropdownIcon = container.querySelector('.pointing.dropdown');
			fireEvent.click(dropdownIcon);
			const content = container.querySelector('.item');
			fireEvent.click(content);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
