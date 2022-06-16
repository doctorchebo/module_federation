import React from 'react';
import { render } from '@testing-library/react';
import SubjectsBulkForm from '..';
import { BrowserRouter } from 'react-router-dom';

const mockState = {
	scholars: [],
	loading: false,
};

const mockAction = { onLoadSubjectDetailsSubjects: jest.fn(), onGetGrades: jest.fn() };

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => ({
	useSubjectDetailsContext: () => {
		return [mockState, mockAction];
	},
}));

const renderComponent = () => {
	return render(<SubjectsBulkForm />, {
		wrapper: BrowserRouter,
	});
};

describe('dashboard/views/subjects.bulk', () => {
	describe('HTML structure', () => {
		test('should render SubjectsBulkView', () => {
			const { container } = renderComponent();
			const form = container.querySelector('form');
			expect(container).toBeDefined();
			expect(form).toBeDefined();
		});
	});
});
