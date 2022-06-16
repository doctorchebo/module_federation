import React from 'react';
import { render } from '@testing-library/react';
import StagePerformance from '..';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';

const data = {
	scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
	programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
};

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: jest.fn(),
	};
});

describe('pages/dashboard/sections/scholars/components/stagePerformance', () => {
	describe('HTML Structure', () => {
		let mockRender;
		let mockRenderIsOpenFalse;

		beforeEach(() => {
			mockRender = () => render(<StagePerformance params={data} isOpen={true} />);
			mockRenderIsOpenFalse = () => render(<StagePerformance params={data} isOpen={false} />);
			useScholarDetailContext.mockImplementation(() => {
				const state = {};
				const actions = {
					onLoadStageSummaryOfScholar: (params) => {
						return params;
					},
				};
				return [state, actions];
			});
		});
		it('Should render with default properties', () => {
			const { container } = mockRender();
			container.state = true;
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
		it('Should be only defined if the param isOpen is false', () => {
			const { container } = mockRenderIsOpenFalse();
			expect(container).toBeDefined();
		});
	});
});
