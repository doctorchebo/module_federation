import React from 'react';
import Dashboard from '../index';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MESSAGE_ERROR } from 'helpers/constants';

const mockLoginState = {
	errorMessages: [MESSAGE_ERROR],
	isLoggedIn: false,
	sidebarHistory: [],
	profile: {
		id: 'd589fbb9-c681-4ed8-af83-523bba17fdd5',
	},
};
const mockLoginAction = { onLogout: jest.fn(), onNotificationsLoad: jest.fn() };

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});

const componentMock = () => <div>componentMock</div>;

jest.mock('pages/dashboard/components/sideMenu', () => componentMock);
jest.mock('pages/dashboard/components/topMenu', () => componentMock);
jest.mock('components/rightSidebarNew', () => componentMock);

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => {
	const state = {};
	const actions = {};

	return {
		useSubjectDetailsContext: () => {
			return [state, actions];
		},
	};
});

const renderWithRouter = (ui, { route = '/dashboard' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/dashboard', () => {
	describe('Html structure', () => {
		it('Should render page dashboard', () => {
			const { container } = renderWithRouter(<Dashboard onLogout='' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
			expect(container.firstChild.childNodes).toHaveLength(1);
		});
	});
});
