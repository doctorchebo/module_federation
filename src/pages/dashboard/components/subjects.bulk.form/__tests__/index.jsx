import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SubjectsBulkForm from '..';

const formTitle = 'Bulk evaluation to scholars';

const properties = {
	title: formTitle,
	loading: false,
	scholarSelected: true,
	onSelectScholar: jest.fn(),
	onSubmit: jest.fn(),
};

const mockState = {
	title: '',
	errorMessages: [],
	scholars: [
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

const renderWithRouter = (ui, { routes = ['/'] } = {}) => {
	return render(<MemoryRouter initialEntries={routes}>{ui}</MemoryRouter>);
};

describe('pages/dashboard/components/subjects.bulk.form', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = renderWithRouter(<SubjectsBulkForm />);
			const title = screen.queryByText(formTitle);
			const checkboxes = container.querySelectorAll('[type="checkbox"]');
			const save = screen.getByRole('button', { name: /save/i });
			expect(container).toBeDefined();
			expect(title).toBeNull();
			expect(checkboxes).toBeDefined();
			expect(save).toBeDefined();
		});

		test('Should render with custom properties', () => {
			const { container } = renderWithRouter(<SubjectsBulkForm {...properties} />);
			const title = screen.queryByText(formTitle);
			const rol = screen.queryByText('Trainer');

			const checkbox = container.querySelector('[type="checkbox"]');
			const save = screen.getByRole('button', { name: /save/i });
			expect(container).toBeDefined();
			expect(title).toBeDefined();
			expect(rol).toBeDefined();
			expect(checkbox).toBeDefined();
			expect(save).toBeDefined();
		});
	});

	describe('BulkEvaluationSubject behaviour', () => {
		test('Should enabled save button when Selected State is True', () => {
			renderWithRouter(<SubjectsBulkForm {...properties} selected={true} />);
			const save = screen.getByRole('button', { name: /save/i });
			expect(save).toBeDefined();
		});
		test('Should be disabled the submit button at the beginning', () => {
			const { container } = renderWithRouter(<SubjectsBulkForm {...properties} />);
			const buttonSaveElement = container.querySelector('Button[type="submit"]');
			expect(buttonSaveElement.disabled).toEqual(true);
		});
	});
});
