import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import { RolesDataProvider, useRolesContext } from '../rolesContext';

const customRender = (ui) => {
	const { container } = render(<RolesDataProvider>{ui}</RolesDataProvider>);
	return container;
};

const customRenderHook = () => {
	const wrapper = ({ children }) => <RolesDataProvider>{children}</RolesDataProvider>;
	const { result } = renderHook(() => useRolesContext(), { wrapper });
	return result;
};

describe('dashboard/context/AppContext', () => {
	describe('Render children', () => {
		it('Should render component', () => {
			const element = customRender(<h1>Children Test</h1>);
			const header = element.querySelector('h1');
			expect(header.textContent).toBe('Children Test');
		});
	});
	describe('useApplication hook', () => {
		it('Should the custom hook return state', () => {
			const result = customRenderHook();
			const actions = result.current[1];
			const { onLoadRoles } = actions;

			expect(typeof onLoadRoles).toBe('function');
		});
	});
});
