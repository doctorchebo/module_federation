import React from 'react';
import { render } from '@testing-library/react';
import EvaluationSummaryView from '..';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

/**
 * @returns {*} renders the MainView Component
 */
function customRender() {
	return render(
		<Provider store={mockStoreConfig({})}>
			<EvaluationSummaryView />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
}

const mockState = {
	errorMessages: [],
	loading: false,
	programVersion: {
		name: 'test name',
	},
	pendingScholars: [
		{
			name: 'test name 1',
		},
	],
	approvedScholars: [
		{
			name: 'test name 2',
		},
	],
	failedScholars: [
		{
			name: 'test name 3',
		},
	],
	stages: [
		{
			name: 'stage test1',
			id: 'stage test id1',
		},
		{
			name: 'stage test2',
			id: 'stage test id2',
		},
		{
			name: 'stage test final',
			id: 'stage test id final',
		},
	],
};
const mockAction = {
	onLoadProgramVersion: jest.fn(),
	onLoadScholars: jest.fn(),
	onGetStages: jest.fn(),
};

jest.mock('pages/dashboard/sections/programVersions/context/evaluationSummary', () => {
	return {
		useEvaluationSummaryContext: () => {
			return [mockState, mockAction];
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

describe('pages/dashboard/sections/programVersions/views/ProgramVersionSummaryView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			const headerView = container.querySelector('.section-header');

			expect(headerView).toHaveTextContent('test name');
		});
		test('should select by default the last stage', () => {
			const { container } = customRender();
			const lastStage = container.querySelector('.divider.default.text');
			expect(lastStage).toHaveTextContent('stage test final');
		});
	});
});
