import React from 'react';
import { render } from '@testing-library/react';
import CandidateTableRow from '..';
import { BrowserRouter } from 'react-router-dom';

const candidate = {
	person: {
		fullName: 'Vivian Martinez',
		personalEmail: 'asdf@asdf.com',
		phoneNumber: '12312312',
	},
	programVersionName: 'Dev33',
	activity: {
		activityType: {
			description: 'Postulation',
		},
	},
	profile: {
		pathResume: 'www.google.com',
	},
	postulation: {
		approved: true,
	},
};

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<CandidateTableRow {...properties} />, {
		container: document.createElement('tbody'),
		wrapper: BrowserRouter,
	});
	const element = container.querySelector('[name="Custom-Row"]');

	return element;
}

describe('components/candidates.custom.row', () => {
	it('Should render candidate information', () => {
		const element = customRender({ item: candidate, numberOfCells: 6 });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableRowElement);
	});

	it('Should render data from parameters (rows)', () => {
		const element = customRender({
			item: candidate,
			numberOfCells: 6,
		});
		expect(element.querySelector('[name="full-name"]').textContent).toBe(
			`${candidate.person.fullName}`
		);
		expect(element.querySelector('[name="email"]').textContent).toBe(
			candidate.person.personalEmail
		);
		expect(element.querySelector('[name="phoneNumber"]').textContent).toBe(
			candidate.person.phoneNumber
		);
	});
});
