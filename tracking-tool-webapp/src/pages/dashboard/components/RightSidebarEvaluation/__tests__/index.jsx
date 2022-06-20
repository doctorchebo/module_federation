import { render } from '@testing-library/react';
import React from 'react';
import RightSidebarEvaluation from '..';
import { MemoryRouter } from 'react-router-dom';

import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const properties = {
	item: {
		user: {
			value: [
				{
					id: '5ee67aab-389b-40f7-a1ee-2429f3ddd38e',
					scholarName: 'Alexandra Allen',
					lastGradeDate: '2022-05-02T01:53:32.583',
					grade: 'D+',
					color: '#008f2b',
					lastComment: '{"blocks":[{"k}',
					subjectEvaluationId: '74411d06-3eb9-42fc-8c7f-8dcd2e40c8df',
				},
				{
					id: 'd7264727-db0e-44b3-bdac-34b19e355109',
					scholarName: 'Charles Alexander',
					lastGradeDate: '2022-05-02T01:20:13.1',
					grade: 'B-',
					color: '#008f2b',
					lastComment: 'other commentary',
					subjectEvaluationId: 'd014339b-0561-4b2b-b9fe-8a86b37a2526',
				},
			],
			subjectId: 'cbf9b0c1-2291-47ad-9f45-ee668e4bbf6d',
		},
		showUpdateForm: false,
		showCreateForm: false,
		showChangeStatusForm: false,
		displayNewView: true,
		data: {
			id: 'ff73aec6-d856-48b4-a52b-bec115926931',
			scholarName: 'Felicia Alvarez',
			lastGradeDate: '2022-05-02T01:53:32.583',
			grade: 'D-',
			color: '#008f2b',
			lastComment: 'another commentary again againX6',
			subjectEvaluationId: '0c22e73b-372b-4434-8aed-59b2e4579fea',
			subjectId: 'cbf9b0c1-2291-47ad-9f45-ee668e4bbf6d',
		},
	},
	updateForm: false,
	statusForm: false,
	displayNewView: true,
	data: {
		id: '1fdf410a-0554-42ab-b1a4-0e556dd1df21',
		subjectId: 'cbf9b0c1-2291-47ad-9f45-ee668e4bbf6d',
		gradeId: '0e10419f-9aba-4318-b801-d7e97b23c5e0',
		gradeName: 'D',
		gradeColor: '#e1ea02',
		comment: '{"blocks":[{"ke"entityRanges"}',
		isPublished: 'False',
		evaluationDate: '2022-05-02T01:51:17.903',
	},
};

/**
 * @returns {*} renders the EvaluationView Component
 */
function customRender() {
	return render(
		<Provider store={mockStoreConfig({})}>
			<RightSidebarEvaluation {...properties} />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
}

const mockState = {
	approvals: [],
	loadingApprovals: false,
	errorMessages: [],
	evaluation: null,
	loading: false,
	scholarId: '',
	stageId: '',
	scholar: null,
	stages: null,
	currentStage: null,
};
const mockAction = {
	onLoadApprovals: jest.fn(),
	onChangeStage: jest.fn(),
	onCheckApproval: jest.fn(),
};

jest.mock('pages/dashboard/sections/scholars/context/evaluation', () => {
	return {
		useEvaluationContext: () => {
			return [mockState, mockAction];
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
		const { container } = customRender();
		expect(container).toBeDefined();
		expect(container).toBeInstanceOf(HTMLElement);
	});

	it('should render the segment', () => {
		const { container } = customRender();
		const root = container.querySelector('.evaluation-main');
		expect(root).toBeInstanceOf(HTMLDivElement);
	});

	it('should render the content of the evaluations', () => {
		const { container } = customRender();
		const listEvaluations = container.querySelector('.wrapper-evaluations');
		expect(listEvaluations).toEqual(null);
	});

	it('should render the emty content image', () => {
		const { container } = customRender();
		const emtyContainer = container.querySelector('.empty-content');
		expect(emtyContainer).toBeInstanceOf(HTMLDivElement);
	});
});
