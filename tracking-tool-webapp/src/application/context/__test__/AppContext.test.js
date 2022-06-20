import { ApplicationDataProvider, useApplication } from '../AppContext';
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { render } from '@testing-library/react';

const customRender = (ui) => {
	const { container } = render(<ApplicationDataProvider>{ui}</ApplicationDataProvider>);
	return container;
};

const customRenderHook = () => {
	const wrapper = ({ children }) => <ApplicationDataProvider>{children}</ApplicationDataProvider>;
	const { result } = renderHook(() => useApplication(), { wrapper });
	return result;
};
const mockResponse = { success: true, data: ['token'] };

describe('application/context/AppContext', () => {
	describe('Render children', () => {
		it('Should render component', () => {
			const element = customRender(<h1>TestProvider</h1>);
			const header = element.querySelector('h1');
			expect(header.textContent).toBe('TestProvider');
		});
	});
	describe('useApplication hook', () => {
		it('Should the custom hook return state', () => {
			const wrapper = ({ children }) => (
				<ApplicationDataProvider>{children}</ApplicationDataProvider>
			);
			const { result } = renderHook(() => useApplication(), { wrapper });
			const [state, actions] = result.current;
			expect(state.isLoggedIn).toBeFalsy();
			const { onSignIn, onLogout } = actions;
			expect(typeof onSignIn).toBe('function');
			expect(typeof onLogout).toBe('function');
		});
		it('Should change with Logout action', () => {
			const result = customRenderHook();
			act(() => {
				const actions = result.current[1];
				actions.onLogout();
			});
			const state = result.current[0];
			expect(state.isLoggedIn).toBeFalsy();
		});
	});
});

describe('mock api call', () => {
	afterEach(() => {
		if (global.fetch) {
			global.fetch.mockRestore();
		}
	});
	it('Should change with success SignIn action', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(mockResponse),
			})
		);
		const result = customRenderHook();
		await act(async () => {
			const actions = result.current[1];
			actions.onSignIn({ username: 'test', password: 'test' });
		});
		const state = result.current[0];
		expect(state.isLoggedIn).toBeTruthy();
	});

	it('Should change with fail SignIn action', async () => {
		global.fetch = jest.fn(() =>
			Promise.reject({
				status: 400,
			})
		);
		const result = customRenderHook();
		await act(async () => {
			const actions = result.current[1];
			actions.onSignIn({ username: 'test', password: 'test' });
		});
		const state = result.current[0];
		expect(state.errorMessages).toBeDefined();
	});

	it('Should the user logged out when success LogOut action', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve({ success: true }),
			})
		);
		const result = customRenderHook();
		await act(async () => {
			const actions = result.current[1];
			actions.onLogout();
		});
		const state = result.current[0];
		expect(state.isLoggedIn).toBeFalsy();
	});

	it('Should the user logged out when failed LogOut action', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 400,
			})
		);
		const result = customRenderHook();
		await act(async () => {
			const actions = result.current[1];
			actions.onLogout();
		});
		const state = result.current[0];
		expect(state.isLoggedIn).toBeFalsy();
		expect(state.errorMessages).toBeDefined();
	});
});
