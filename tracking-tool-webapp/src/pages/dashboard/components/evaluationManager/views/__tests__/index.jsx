import React from 'react';
import { render } from '@testing-library/react';
import MainView from '../index';

const mockEventState = { viewStack: [], pagination: { currentPage: 0 } };

const mockEvaluation = {
	color: '#f91c03',
	grade: 'D',
	id: '5ee67aab-389b-40f7-a1ee-2429f3ddd38e',
	lastComment: 'comment test',
	lastGradeDate: '2022-05-26T16:34:52.503',
	scholarName: 'Alexandra Allen',
	subjectEvaluationId: 'b74f8095-a4e9-47f5-a0f0-b28997e77225',
	subjectId: 'cbf9b0c1-2291-47ad-9f45-ee668e4bbf6d',
};

const mockEventAction = {
	onLoadEvaluationHistory: jest.fn(),
	onGetGrades: jest.fn(),
	onAddView: jest.fn(),
	onPopView: jest.fn(),
};

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => {
	return {
		useSubjectDetailsContext: () => {
			return [mockEventState, mockEventAction];
		},
	};
});

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<MainView {...properties} />);

	return container;
}

describe('pages/dashboars/components/eventsManager/views', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	test('Should display calls to views', async () => {
		const element = await customRender({
			user: { id: 1 },
			showCreateForm: true,
			data: mockEvaluation,
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
		expect(mockEventAction.onAddView).toBeCalledTimes(2);
	});

	test('should render the list of evaluations', async () => {
		const element = await customRender({
			user: { id: 1 },
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
		expect(mockEventAction.onAddView).toBeCalledTimes(1);
	});

	test('Should render the list component', async () => {
		const element = await customRender({
			user: { id: 1 },
			showCreateForm: false,
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
		expect(mockEventAction.onAddView).toBeCalledTimes(1);
	});
});
