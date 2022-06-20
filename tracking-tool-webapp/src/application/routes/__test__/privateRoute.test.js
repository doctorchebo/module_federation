import React from 'react';
import { Router } from 'react-router';
import PrivateRoute from '../privateRoute';
import { render, cleanup } from '@testing-library/react';
import { createBrowserHistory } from 'history';

let mockLoginState = { isLoggedIn: false, profile: {} };
const mockLoginAction = { onProfile: jest.fn() };

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});

describe('Test Suite for RouteGuard', () => {
	afterEach(cleanup);
	it('should go to /login if it tries /profile without signing', () => {
		const history = createBrowserHistory();
		history.push('/login');
		render(
			<Router history={history}>
				<PrivateRoute
					path={'/login'}
					roles={['admin', 'viewer']}
					component={() => <h2>{'testText'}</h2>}
				/>
			</Router>
		);
		expect(history.location.pathname).toBe('/login');
	});
	it('should go to /dashboard if it is signed', () => {
		mockLoginState.isLoggedIn = true;
		mockLoginState.profile = { role: 'admin' };

		const history = createBrowserHistory();
		history.push('/dashboard');
		render(
			<Router history={history}>
				<PrivateRoute
					path={'/dashboard'}
					roles={['admin']}
					component={() => <h2>{'testText'}</h2>}
				/>
			</Router>
		);
		expect(history.location.pathname).toBe('/dashboard');
	});
});
