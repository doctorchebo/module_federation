import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import SubjectEvaluationRow from '../index';

const scholarEvaluation = {
	id: '11221111-1d83-44d5-b264-1e17feabd322',
	Scholar: 'Marcos Armendia Galardon',
	AverageGrade: 'C',
	notes: [
		{
			name: 'C#',
			grade: 'A',
			comment: 'Lorem ipsum dolor sit amet',
		},
		{
			name: 'React',
			grade: 'B',
			comment: 'Quisque lacinia enim vulputate',
		},
		{
			name: 'Asp',
			grade: 'C',
			comment: 'Lorem ipsum dolor sit amet',
		},
		{
			name: 'Coordinator',
			grade: 'A',
			comment: 'Lorem ipsum dolor sit amet, consectetur',
		},
	],
};

describe('pages/dashboard/components/subject.evaluation.row', () => {
	describe('Html structure', () => {
		it('Should render a scholar evaluation row', () => {
			const { container } = render(
				<BrowserRouter>
					<SubjectEvaluationRow item={scholarEvaluation} />
				</BrowserRouter>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
			expect(container.firstChild.childNodes).toHaveLength(3);
		});
	});
});
