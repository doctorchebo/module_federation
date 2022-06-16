import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TopMenu from '..';
import { MESSAGE_ERROR } from 'helpers/constants';
import { BrowserRouter } from 'react-router-dom';

const mockLoginState = { errorMessages: [MESSAGE_ERROR], isLoggedIn: false };
const mockLoginAction = {
	onLogout: jest.fn(),
	onNotificationsLoad: jest.fn(),
	onSidebarAddView: jest.fn(),
	onNotificationsUpdate: jest.fn(),
};
const mockSessionState = {
	profile: { firstName: 'testFN', lastName: 'testLN', role: 'Trainer' },
	notifications: { list: [], viewed: false },
};

const renderWithRouter = (ui, { route = '/profile' } = {}) => {
	window.history.pushState({}, 'Test page', route);
	return render(ui, { wrapper: BrowserRouter });
};

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {
		breadCrumbs: {
			icon: 'iconMock',
		},
	};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction, mockSessionState];
		},
	};
});

jest.mock('../../userDetails/index', () => {
	const userDetailsMock = () => <div>userDetailsMock</div>;
	return userDetailsMock;
});

const setup = () => {
	return renderWithRouter(<TopMenu session={mockSessionState} actions={mockLoginAction} />);
};

describe('pages/dashboard/components/topMenu', () => {
	describe('Html structure', () => {
		it('Should render topMenu', () => {
			const { container } = setup();
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('Top menu notification functions', () => {
		it('Should show the notifications sidebar', () => {
			const { container } = setup();
			const element = container.querySelector('.notification');
			fireEvent.click(element);
			expect(mockLoginAction.onNotificationsUpdate.mock.calls[0]).toEqual([
				{ list: [], viewed: true },
			]);
		});
	});
});
