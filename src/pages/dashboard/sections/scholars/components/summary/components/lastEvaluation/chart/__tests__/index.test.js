import { render } from '@testing-library/react';
import React from 'react';
import ChartSkills from '..';

jest.mock('react-apexcharts', () => {
	return {
		__esModule: true,
		default: ({ options, series }) => {
			if (series !== undefined && series.length > 1) {
				return series.map((item) => <span key={item.name}>{item.name}</span>);
			}
			return <div />;
		},
	};
});

const mockOptions = {
	isOkay: true,
};

const mockSeries = [
	{
		name: 'Skill-1',
	},
	{
		name: 'Skill-2',
	},
];

describe('components/summary/components/lastEvaluation/chart', () => {
	let mockRender;
	let mockWithProps;

	beforeEach(() => {
		mockRender = () => render(<ChartSkills options={{}} series={[]} />);
		mockWithProps = () => render(<ChartSkills options={mockOptions} series={mockSeries} />);
	});

	describe('Html structure', () => {
		it('Should render chart', () => {
			const { container } = mockRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render with options and series', () => {
			const { getByText } = mockWithProps();
			const skillName = getByText(mockSeries[0].name);
			expect(skillName).toBeDefined();
		});
	});
});
