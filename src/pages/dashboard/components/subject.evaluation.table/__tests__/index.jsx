import React from 'react';
import { render } from '@testing-library/react';
import SubjectEvaluationTable from '..';
import { BrowserRouter } from 'react-router-dom';

const scholars = {
	programVersion: 'Dev31',
	stage: 'Team Project',
	scholars: [
		{
			scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Marcos Armendia',
			average: 'B',
			evaluations: [
				{
					subjet: 'Coordinator',
					grade: 'B-',
					weight: 7,
					comment: 'Lorem ipsum dolor sittus justo, suscipit',
				},
				{
					subjet: 'Monitoring',
					grade: 'B+',
					weight: 9,
					comment: 'Lorem ipsum dolor sit aiquam lectus justo, suscipit',
				},
			],
		},
		{
			scholarId: '11221118-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Sofia Perez',
			average: null,
			evaluations: [],
		},
		{
			scholarId: '11111119-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Jorge Delgadillo Mamani',
			average: null,
			evaluations: [],
		},
	],
};
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(
		<BrowserRouter>
			<SubjectEvaluationTable data={properties} />
		</BrowserRouter>
	);
	const element = container.querySelector('[name="Subject-Table"]');

	return element;
}

describe('pages/dashboard/components/subject.evaluation.table', () => {
	it('Should render subject evaluation table element', () => {
		const element = customRender({ scholars });
		const table = document.querySelector('[name="Subject-Table"]');
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableElement);
		expect(table.children[0]).toBeInstanceOf(HTMLTableSectionElement);
	});
});
