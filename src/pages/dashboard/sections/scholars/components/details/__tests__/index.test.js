import React from 'react';
import { render } from '@testing-library/react';
import ProfileDetails from '..';
import { statusName } from '../../../helpers/mapScholarsToTable';

jest.mock('../../summary', () => {
	const CardSummaryMock = () => <div>CardSummaryMock</div>;
	return CardSummaryMock;
});

describe('pages/dashboard/sections/scholars/components/Details', () => {
	const profile = {
		fullName: 'Juan Perez',
		version: 'Dev 31',
		email: 'juan@fundacion-jala.org',
		phone: '98765412',
		currentCity: 'Cochabamba',
		status: statusName(4),
		enrollDate: '2012-12-20T00:00:00.0000000Z',
		endDate: '2023-03-16T00:00:00.0000000Z',
	};

	describe('Tests of the component <Details/>', () => {
		let wrapper;
		beforeEach(() => {
			wrapper = render(<ProfileDetails profileData={profile} />);
		});

		it('Should render with default properties', () => {
			const { container } = wrapper;
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render email of the scholar', () => {
			const { getByText } = wrapper;
			const email = getByText('juan@fundacion-jala.org');
			expect(email).toBeDefined();
		});

		it('Should match with the snapshot', () => {
			const { asFragment } = wrapper;
			expect(asFragment()).toMatchSnapshot();
		});

		it('Should render fullname of the scholar', () => {
			const { getByText } = wrapper;
			const fullname = getByText('Juan Perez').innerHTML;
			expect(fullname).toBe(profile.fullName);
		});

		it('Should render current city of the scholar', () => {
			const { getByText } = wrapper;
			const city = getByText('Cochabamba');
			expect(city).toBeDefined();
			expect(city.textContent).toBe(profile.currentCity);
		});

		it('Should display the scholar state', () => {
			const { container } = wrapper;
			const status = container.querySelector('[name="status"]');
			expect(status).toBeDefined();
			expect(status.textContent).toBe(profile.status);
		});

		it('Should display the scholar duration', () => {
			const { container } = wrapper;
			const duration = container.querySelector('[name="scholar-duration"]');
			expect(duration).toBeDefined();
			expect(duration.textContent).toBe('Dec 20, 2012 > Mar 16, 2023 (10 years, 3 months)');
		});
	});
});
