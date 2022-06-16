import { render } from '@testing-library/react';
import React from 'react';
import StageScore from '..';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useParams } from 'react-router';

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

describe('components/summary/components/stageScore', () => {
	let mockRender;
	const noStagesText = 'There are no resolved stages';

	beforeEach(() => {
		mockRender = () => render(<StageScore />);
		useScholarDetailContext.mockImplementation(() => {
			const state = {
				data: {
					scholarId: mockId,
				},
			};
			const actions = {
				onGetStageScoreByScholar: (payload) => {
					return payload;
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
		it('Should render a container with class widget-stage', () => {
			const { container } = mockRender();
			const stageScoreContainer = container.querySelector('.widget-stage');
			expect(stageScoreContainer).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render a Message div when data is loading or not exist', () => {
			const { getByText } = mockRender();
			const noStages = getByText(noStagesText);
			expect(noStages).toBeDefined();
		});
	});
});
