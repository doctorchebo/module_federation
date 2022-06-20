import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RightSidebarEvaluate from '..';

import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const properties = {
	item: {
		color: '#008f2b',
		grade: 'A+',
		id: '925da199-4883-42f1-b58f-7f24082a2750',
		lastComment: 'Comments evaluation',
		lastGradeDate: '2022-05-19T15:22:49.573',
		scholarName: 'Abigail Alonso',
		subjectEvaluationId: 'b34be94a-29fe-46c1-b618-18e9772e4c38',
	},
	subjectId: '08308360-0d69-4cbe-7bbe-08d95c177865',
};
const commentDefaultMock = 'Would you like to work with him/her?';
const mockProps = {
	item: {
		color: '#008f2b',
		grade: null,
		id: '925da199-4883-42f1-b58f-7f24082a2750',
		lastComment: null,
		lastGradeDate: '2022-05-19T15:22:49.573',
		scholarName: 'Marcos Armendia',
		subjectEvaluationId: 'b34be94a-29fe-46c1-b618-18e9772e4c38',
	},
	subjectId: '08308360-0d69-4cbe-7bbe-08d95c177865',
};

/**
 * @param {object} props - properties
 * @returns {*} renders the RightSidebarEvaluate Component
 */
function renderComponent(props) {
	return render(
		<Provider store={mockStoreConfig({})}>
			<RightSidebarEvaluate {...props} />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
}

const mockState = {
	title: 'SubjectDetails',
	errorMessages: [],
	roles: [],
	permissions: [],
	reports: null,
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loading: false,
	loadSubjects: false,
	sideBar: false,
	programVersions: [],
	subjects: [],
	actualSubject: null,
	scholars: [],
	loadScholars: false,
	grades: [
		{
			color: '#008f2b',
			gpa: 9,
			key: 'a7ffd924-aff6-410a-98a1-133bc399126d',
			text: 'A+',
			value: 'a7ffd924-aff6-410a-98a1-133bc399126d',
		},
		{
			color: '#008f2b',
			gpa: 8,
			key: 'a7ffd924-aff6-410a-98a1-133bc399126d',
			text: 'B',
			value: 'a7ffd924-aff6-410a-98a1-133bc399126d',
		},
		{
			color: '#00800f',
			gpa: 7,
			key: 'a7ffd924-aff6-410a-98a1-133bc3998876',
			text: 'C',
			value: 'a7ffd924-aff6-410a-98a1-133bc3998899',
		},
	],
	viewStack: [],
};

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => {
	return {
		useSubjectDetailsContext: () => {
			return [
				mockState,
				{
					onPostEvaluate: jest.fn(),
					onGetGrades: jest.fn(),
				},
			];
		},
	};
});

const mockApplicationState = {};
const mockApplicationAction = {};

jest.mock('application/context/AppContext.js', () => {
	return {
		useApplication: () => {
			return [mockApplicationState, mockApplicationAction];
		},
	};
});

describe('pages/dashboard/components/RightSidebarEvaluation', () => {
	it('should render by default', () => {
		const { container } = renderComponent(properties);
		const nameHeader = screen.getByText(/Abigail Alonso/i);
		const comment = screen.getByText(/Comments evaluation/i);
		const listGrades = screen.getByRole('listbox');
		expect(container).toBeDefined();
		expect(container).toBeInstanceOf(HTMLElement);
		expect(nameHeader).toBeDefined();
		expect(comment).toBeDefined();
		expect(listGrades).toBeInstanceOf(HTMLDivElement);
	});

	it('should show the form', () => {
		const { container } = renderComponent(properties);
		const root = container.querySelector('.container-form-evaluate');
		expect(root).toBeInstanceOf(HTMLDivElement);
	});

	it('should display the number of elements', () => {
		const { container } = renderComponent(properties);
		const listEvaluations = container.childElementCount;
		expect(listEvaluations).toEqual(2);
	});

	it('should render by default whitout evaluation', () => {
		const { container } = renderComponent(mockProps);
		const comment = screen.getByText(commentDefaultMock);
		const listGrades = screen.getByRole('listbox');
		expect(container).toBeDefined();
		expect(container).toBeInstanceOf(HTMLElement);
		expect(comment).toBeDefined();
		expect(listGrades).toBeInstanceOf(HTMLDivElement);
		expect(listGrades.childElementCount).toEqual(3);
	});
});
