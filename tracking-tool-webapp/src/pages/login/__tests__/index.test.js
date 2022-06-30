import { render } from '@testing-library/react';
import { BrowserRouter, useHistory, MemoryRouter } from 'react-router-dom';
import Login from '../index';
import React from 'react';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { fn } from 'moment';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const mockLoginState = { isLoggedIn: true };
const mockLoginAction = { onSignIn: jest.fn() };
jest.mock('../../login/index', () => {
	const Login = jest.fn();
	return <Login />;
});
jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};
let spyOnHistory = jest.fn();

/**
 *
 * @returns {React.Component} -
 */
function WrapperPage() {
	const history = useHistory();
	spyOnHistory = jest.spyOn(history, 'push');
	return <Login />;
}

describe('pages/login', () => {
	describe('Html structure', () => {
		it('Should render page login', async () => {
			const { container } = renderWithRouter(
				<Provider store={mockStoreConfig({})}>
					<mockLogin />
				</Provider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
			expect(container.firstChild.childNodes).toHaveLength(1);
		});
	});

	it('should go /profile if it is signed', () => {
		render(
			<Provider store={mockStoreConfig({})}>
				<WrapperPage />
			</Provider>,
			{ wrapper: MemoryRouter }
		);
		expect(spyOnHistory).toHaveBeenLastCalledWith('/dashboard');
	});
});
