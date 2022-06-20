import React from 'react';
import { render } from '@testing-library/react';
import CandidatesTable from '..';
import { BrowserRouter } from 'react-router-dom';

const listCandidates = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		programVersionName: 'Dev31',
		profile: {
			pathresume: 'www.google.com',
		},
		activity: {
			activityType: {
				description: 'None',
			},
		},
		postulation: {
			approved: true,
		},
	},
	{
		id: '4fffc534-1d83-14d5-b204-1e17f2abd323',
		person: {
			currentCity: 'Cochabamba',
			fullName: 'Person 2 Last Name 2',
			personalEmail: 'person2@person.com',
			phoneNumber: '123123123023',
		},
		programVersionName: 'Dev33',
		profile: {
			pathResume: 'www.gitlab.com',
		},
		activity: {
			activityType: {
				description: 'Postulation',
			},
		},
		postulation: {
			approved: true,
		},
	},
];
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(
		<BrowserRouter>
			<CandidatesTable {...properties} />
		</BrowserRouter>
	);
	const element = container.querySelector('[name="Candidates-Table"]');

	return element;
}

describe('pages/dashboard/components/candidates.table', () => {
	it('Should render candidates table element', () => {
		const element = customRender({ value: listCandidates });
		const table = document.querySelector('[name="Candidates-Table"]');
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableElement);
		expect(table.children[0]).toBeInstanceOf(HTMLTableSectionElement);
		expect(table.children).toHaveLength(2);
	});
});
