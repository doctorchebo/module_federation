import React from 'react';
import { render } from '@testing-library/react';
import SubjectAccordion from '../index';

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			const state = {
				profile: {
					id: '4b4e3730-76c7-4333-8fe8-ab635eacb9c9',
				},
			};
			const actions = {};
			return [state, actions];
		},
	};
});

jest.mock('pages/dashboard/sections/subjects/context/subjectDetailsContext', () => {
	return {
		useSubjectDetailsContext: () => {
			const state = {
				subjects: [],
			};
			const actions = {
				onLoadSubjects: () => [],
				onChangeActualSubject: () => {},
			};
			return [state, actions];
		},
	};
});

jest.mock('react-router-dom', () => {
	return {
		useLocation: () => ({
			pathname: 'localhost:3000/example/path',
		}),
	};
});

describe('/components/subjectAccordion/index', () => {
	const mockProps = {
		link: '/subjects/javascript',
		name: 'subjects',
		iconSecondary: 'book',
	};

	it('should display the accordion with props', () => {
		const accordion = render(<SubjectAccordion {...mockProps} />);
		expect(accordion).toBeDefined();
	});

	it('should display the accordion without props', () => {
		const accordion = render(<SubjectAccordion />);
		expect(accordion).toBeDefined();
	});
});
