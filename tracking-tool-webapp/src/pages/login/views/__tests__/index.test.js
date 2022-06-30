import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Login from '../../index';
import { MemoryRouter } from 'react-router';
import { MESSAGE_ERROR } from 'helpers/constants';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
jest.mock(
	'../../../login/index',
	() => {
		const Login = jest.fn();
		return <Login />;
	},
	{ virtual: true }
);
const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const mockLoginState = { errorMessages: [MESSAGE_ERROR], isLoggedIn: false };
const mockLoginAction = { onSignIn: jest.fn() };

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});

/**
 * @returns {React.Element} -
 */
function customRender() {
	const { container } = render(
		<Provider store={mockStoreConfig({})}>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>
	);
	const element = container.querySelector('.form');

	return element;
}

describe('login view', () => {
	beforeEach(() => {
		mockLoginState.error = null;
		mockLoginAction.onSignIn.mockReset();
	});

	test('contains a sign in form', () => {
		const root = customRender();

		expect(root).toBeDefined();
		expect(root).toBeInstanceOf(HTMLFormElement);
	});
	test('should submit empty user credential without fill inputs', () => {
		const root = customRender();
		const submit = root.querySelector('.form [type="submit"]');

		fireEvent.click(submit);
		expect(mockLoginAction.onSignIn.mock.calls[0]).toEqual(undefined);
	});
	test('should submit credential with field are valid', () => {
		const root = customRender();
		const password = root.querySelector('.input [type="password"]');
		const email = root.querySelector('.input [type="text"]');
		const submit = root.querySelector('.form [type="submit"]');

		fireEvent.change(password, { target: { value: 'test' } });
		fireEvent.change(email, { target: { value: 'test@gmail.com' } });

		fireEvent.click(submit);
		expect(mockLoginAction.onSignIn.mock.calls[0]).toEqual([
			{ email: 'test@gmail.com', password: 'test' },
		]);
	});
});
