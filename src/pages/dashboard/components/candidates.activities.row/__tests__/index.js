import React from 'react';
import { render } from '@testing-library/react';
import CandidatesActivitiesTableRow from '..';
import { BrowserRouter } from 'react-router-dom';

const candidate = {
	id: '9dd0fe35-3a29-4012-8247-8ee74c4e3bf1',
	person: {
		id: '22f94ea3-0dc8-412b-af5b-f7794de90640',
		fullName: 'Gilda Silvestre López',
		identityCard: '8707891',
		personalEmail: 'gildasilvestrelopez09@gmail.com',
		phoneNumber: '67890456',
		dateBorn: '1998-08-29T00:00:00',
		currentCountry: 'Bolivia',
		currentCity: 'La Paz',
	},
	idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
	programVersionName: 'Dev33',
	profile: {
		id: '375554d2-0906-4207-8e27-bd7e638a7aa4',
		academicDegree: 'System Engineer',
		career: 'Systems Engineering',
		university: 'UMSA',
		pathResume:
			'https://drive.google.com/u/2/open?usp=forms_web&id=1CYIuhorrCQQ87cEQkWIXs0m7PCD8_jIQ',
	},
	activity: {
		id: '5c49d000-1a28-4261-abfe-1a5d602e612b',
		activityType: {
			id: '89b041ba-478b-4c9e-9ae5-24b3286101af',
			description: 'Postulation',
		},
		startDateTime: '2022-02-25T10:15:00',
		endDateTime: '2022-02-25T12:00:00',
		isCompleted: false,
		idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
	},
};

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<CandidatesActivitiesTableRow {...properties} />, {
		container: document.createElement('tbody'),
		wrapper: BrowserRouter,
	});
	const element = container.querySelector('[name="Custom-Row"]');

	return element;
}

describe('components/candidates.activities.row', () => {
	it('Should render candidate activity information', () => {
		const element = customRender({ item: candidate, numberOfCells: 3 });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableRowElement);
	});

	it('Should render data from parameters (rows)', () => {
		const element = customRender({
			item: candidate,
			numberOfCells: 3,
		});
		expect(element.querySelector('[name="full-name"]').textContent).toBe(
			`${candidate.person.fullName}`
		);
		expect(element.querySelector('[name="activity"]').textContent).toBe(
			candidate.activity.activityType.description
		);
	});
});
