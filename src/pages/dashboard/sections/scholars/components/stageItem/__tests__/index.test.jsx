import React from 'react';
import { render } from '@testing-library/react';
import StageIem from '..';

const data = {
	evaluationId: 'be74dad2-5b7e-4ffd-7bbf-08d95c177862',
	scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
	stageId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
	userId: '4fffc534-1d83-44d5-b264-1e17feabd322',
	overallRating: 3,
	generalComments: 'He has a good knowledge, but his focus gets decreased easily',
	goals: 'Less Sleep, more focus on work',
	isRecommended: false,
	stageName: 'Frontend',
};

describe('pages/dashboard/sections/scholars/components/stageItem', () => {
	describe('HTML Structure', () => {
		let mockRender;

		beforeEach(() => {
			mockRender = () => render(<StageIem data={data} isTheCurrent={false} />);
		});

		it('Should render with default properties', () => {
			const { container } = mockRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render name of the current stage', () => {
			const { getByText } = mockRender();
			const name = getByText(`Stage - ${data.stageName}`);
			expect(name).toBeDefined();
		});
		it('Should render the progress label correctly', () => {
			const { getByText } = mockRender();
			const rating = getByText(`${data.overallRating} / 5`);
			expect(rating).toBeDefined();
		});
		it('Should render the comments section', () => {
			const { getByText } = mockRender();
			const rating = getByText(data.generalComments);
			expect(rating).toBeDefined();
		});
		it('Should render the goals section', () => {
			const { getByText } = mockRender();
			const rating = getByText(data.goals);
			expect(rating).toBeDefined();
		});
	});
});
