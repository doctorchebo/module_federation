import { render } from '@testing-library/react';
import React from 'react';
import RightSidebarEvaluationProfile from '..';
import { MemoryRouter } from 'react-router-dom';

const properties = {
	item: {
		evaluationId: '08308360-0d69-4cbe-7bbe-08d95c177862',
		generalComments: null,
		goals: null,
		isRecommended: false,
		overallRating: 0,
		scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
		stageId: '4fffc534-1d83-12d5-b264-1e17f2abd322',
		stageName: 'Frontend',
		userId: '4fffc534-1d83-44d5-b264-1e17feabd322',
	},
};

/**
 * @returns {*} renders the EvaluationView Component
 */
function customRender() {
	return render(<RightSidebarEvaluationProfile {...properties} />, { wrapper: MemoryRouter });
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

describe('pages/dashboard/components/RightSidebarEvaluationProfile', () => {
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
