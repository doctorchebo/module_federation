import React from 'react';
import { render } from '@testing-library/react';
import EvaluationView from '..';
import { MemoryRouter } from 'react-router-dom';

/**
 * @returns {*} renders the EvaluationView Component
 */
function customRender() {
	return render(<EvaluationView />, { wrapper: MemoryRouter });
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
	onLoadScholarId: jest.fn(),
	onLoad: jest.fn(),
	onLoadApprovals: jest.fn(),
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

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

describe('pages/dashboard/sections/scholars/views/EvaluationView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
