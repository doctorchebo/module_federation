import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SubjectsBulkScholarTable from '..';
import { BrowserRouter } from 'react-router-dom';

/**
 * @returns {object} - rendered component.
 */
function getBulkTable() {
	const { container } = render(
		<BrowserRouter>
			<SubjectsBulkScholarTable />
		</BrowserRouter>
	);
	const element = container.querySelector('.bulkTable');

	return element;
}

const mockState = {
	title: '',
	errorMessages: [],
	scholars: [
		{
			id: '11111120-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Cristhian Ortiz Quispe',
			lastGradeDate: '2022-05-02T01:51:17.903',
			grade: 'A+',
			color: '#008f2b',
			lastComment:
				'This is a very long comment for testing porpouse, from DataBase, again created ',
			subjectEvaluationId: 'ea39a15e-9928-439c-898f-cbf31ea41541',
		},
		{
			id: '11111119-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Jorge Delgadillo Mamani',
			lastGradeDate: '2022-05-02T02:20:32.267',
			grade: 'D+',
			color: '#f91c03',
			lastComment: 'Last commentary again againX7',
			subjectEvaluationId: '316a0fb1-9925-4089-b8ce-cdbfe38b775e',
		},
		{
			id: '11221111-1d83-44d5-b264-1e17feabd322',
			scholarName: 'Marcos Armendia',
			lastGradeDate: '2022-05-02T01:53:32.583',
			grade: 'A-',
			color: '#008f2b',
			lastComment: 'another commentary again againX6',
			subjectEvaluationId: '0610a066-5028-4771-9654-9d4b0a2693cb',
		},
	],
	loading: false,
};

const mockAction = { onLoadSubjectDetailsSubject: jest.fn(), onGetGrades: jest.fn() };

jest.mock('../../../sections/subjects/context/subjectDetailsContext', () => ({
	useSubjectDetailsContext: () => {
		return [mockState, mockAction];
	},
}));

describe('pages/dashboard/components/subjects.bulk.scholar.table', () => {
	describe('HTML structure', () => {
		test('Should render scholar table element', () => {
			const element = getBulkTable();
			const table = document.querySelector('.bulkTable');
			expect(element).toBeDefined();
			expect(element).toBeInstanceOf(HTMLDivElement);
			expect(table.children[0]).toBeInstanceOf(HTMLDivElement);
		});

		test('When the checkbox change state', () => {
			const container = getBulkTable();
			const checkbox = container.querySelector('[type="checkbox"]');
			expect(checkbox.checked).toEqual(false);
			fireEvent.click(checkbox);
			expect(checkbox.checked).toEqual(true);
		});
	});
});
