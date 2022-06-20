import React from 'react';
import { render } from '@testing-library/react';
import SideMenu from '../index';
import { BrowserRouter } from 'react-router-dom';
import { UsersDataProvider } from '../../../sections/users/context/usersContext';

const mockLoginState = {
	profile: {
		id: 'd589fbb9-c681-4ed8-af83-523bba17fdd5',
	},
};

const mockLoginAction = { onLogout: jest.fn() };

const mockDetailsState = {
	subjects: [],
};

const mockDetailsAction = {
	onLoadSubjects: jest.fn(),
	onChangeActualSubject: jest.fn(),
};

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockLoginState, mockLoginAction];
		},
	};
});

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => {
	return {
		useSubjectDetailsContext: () => {
			return [mockDetailsState, mockDetailsAction];
		},
	};
});

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('SideMenu component', () => {
	it('has a SideMenu component to show', () => {
		const { container } = renderWithRouter(
			<UsersDataProvider>
				<SideMenu actions={mockLoginAction} />
			</UsersDataProvider>
		);
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});
});
