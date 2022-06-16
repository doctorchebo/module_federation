import { render } from '@testing-library/react';
import React from 'react';
import ChartContainer from '..';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useParams } from 'react-router';

const chartMock = () => <div>h1</div>;

jest.mock('../chart', () => chartMock);

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: jest.fn(),
	};
});

jest.mock('react-router', () => {
	return {
		useParams: jest.fn(),
	};
});

const mockId = '11111119-1d83-44d5-b264-1e17feabd322';

describe('components/summary/components/lastEvaluation', () => {
	let mockRender;
	const loadingText = 'Loading...';

	beforeEach(() => {
		mockRender = () => render(<ChartContainer />);
		useScholarDetailContext.mockImplementation(() => {
			const state = {
				data: {
					programVersionId: mockId,
				},
				lastEvaluationSummary: {
					skills: [],
				},
			};
			const actions = {
				OnGetLastStageEvaluationSkills: (params) => {
					return params;
				},
			};
			return [state, actions];
		});
		useParams.mockImplementation(() => {
			return {
				id: mockId,
			};
		});
	});

	describe('Html structure', () => {
		it('Should render chart container', () => {
			const { container } = mockRender();
			const chartContainer = container.querySelector('.chart-evaluations-container');
			expect(chartContainer).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render a loading div when data still not fetch', () => {
			useScholarDetailContext.mockImplementation(() => {
				const state = {
					data: {
						programVersionId: mockId,
					},
					loadingLastEvaluationSummary: true,
				};
				const actions = {
					OnGetLastStageEvaluationSkills: (params) => {
						return params;
					},
				};
				return [state, actions];
			});
			const { getByText } = mockRender();
			const loading = getByText(loadingText);
			expect(loading).toBeDefined();
		});
		it('Should render an error div when fetch failed', () => {
			useScholarDetailContext.mockImplementation(() => {
				const state = {
					data: {
						programVersionId: mockId,
					},
					errorLastEvaluationSummary: {},
				};
				const actions = {
					OnGetLastStageEvaluationSkills: (params) => {
						return params;
					},
				};
				return [state, actions];
			});

			const { container } = mockRender();
			const errorContainer = container.querySelector('.error-message-container');
			expect(errorContainer).toBeDefined();
		});
	});
});
