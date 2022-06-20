import React from 'react';
import { render } from '@testing-library/react';
import ProgramVersionDetailsView from '..';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

/**
 * @returns {*} renders the ProgramVersionDetailsView Component
 */
function customRender() {
	return render(<ProgramVersionDetailsView />, { wrapper: MemoryRouter });
}

const mockState = {
	errorMessages: [],
	programVersion: {
		name: 'Dev33-2',
	},
	activities: [
		{
			id: 'be26cc70-9d07-11ec-b909-0142ac120002',
			activityType: {
				id: '7a81f304-9ce0-11ec-b919-0242ac120002',
				description: 'Informative Talk',
			},
			startDateTime: '2022-01-22T10:00:00',
			endDateTime: '2022-01-22T10:30:00',
			isCompleted: false,
			idProgramVersion: '7345a111-fd04-45e6-dd2d-08d993ffadac',
		},
	],
	candidates: [
		{
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
					'https://drive.google.com/u/2/open?usp=forms_web&id=1CYIhorrCQQ87cEQkWIXs0m7PCD8_jIQ',
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
		},
	],
};
const mockAction = {
	onLoadProgramVersion: jest.fn(),
	onLoadActivitiesByProgramVersion: jest.fn(),
	onLoadCandidatesByProgramVersion: jest.fn(),
	onLoadBoardData: jest.fn(),
};
jest.mock('pages/dashboard/sections/programVersions/context/ProgramVersionDetails', () => {
	return {
		useProgramVersionDetailsContext: () => {
			return [mockState, mockAction];
		},
	};
});
describe('pages/dashboard/sections/programVersions/views/ProgramVersionDetailsView', () => {
	describe('HTML structure', () => {
		test('should render by default', () => {
			const { container } = customRender();
			const headerView = container.querySelector('.header');

			expect(headerView).toHaveTextContent('Dev33-2');
		});
	});
});
