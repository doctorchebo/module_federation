import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react';
import { render } from '@testing-library/react';
import { UsersDataProvider, useUsersContext } from '../usersContext';

const customRender = (ui) => {
	const { container } = render(<UsersDataProvider>{ui}</UsersDataProvider>);
	return container;
};

const customRenderHook = () => {
	const wrapper = ({ children }) => <UsersDataProvider>{children}</UsersDataProvider>;
	const { result } = renderHook(() => useUsersContext(), { wrapper });
	return result;
};
const mockResponse = { data: ['user1', 'user2'], pagination: {}, success: true };

describe('dashboard/context/AppContext', () => {
	describe('Render children', () => {
		it('Should render component', () => {
			const element = customRender(<h1>TestProvider</h1>);
			const header = element.querySelector('h1');
			expect(header.textContent).toBe('TestProvider');
		});
	});
	describe('useApplication hook', () => {
		it('Should the custom hook return state', () => {
			const result = customRenderHook();
			const actions = result.current[1];
			const { onUsersLoad } = actions;

			expect(typeof onUsersLoad).toBe('function');
		});
	});
});

describe('mock api call', () => {
	afterEach(() => {
		if (global.fetch) {
			global.fetch.mockRestore();
		}
	});
	it('Should change with success onUsersLoad action', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				status: 200,
				json: () => Promise.resolve(mockResponse),
			})
		);
		const result = customRenderHook();
		const actions = result.current[1];
		await act(async () => {
			actions.onUsersLoad();
		});
		const state = result.current[0];
		expect(state.users).toHaveLength(2);
	});

	it('Should change with fail SignIn action', async () => {
		global.fetch = jest.fn(() =>
			Promise.reject({
				status: 400,
			})
		);
		const result = customRenderHook();
		const actions = result.current[1];
		await act(async () => {
			actions.onUsersLoad();
		});
		const state = result.current[0];
		expect(state.users).toEqual([]);
	});
});
