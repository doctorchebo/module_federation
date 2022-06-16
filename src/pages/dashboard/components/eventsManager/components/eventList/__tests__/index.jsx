import React from 'react';
import { render } from '@testing-library/react';
import jwt_decode from 'jwt-decode';
import EventList from '..';
import 'jest-canvas-mock';

jest.mock('jwt-decode');

const events = [
	{
		title: 'title test',
		description: 'description test',
		eventType: { name: 'test', id: 'guid' },
	},
];

describe('pages/dashboard/components/eventsManager/components/eventList', () => {
	it('Should render by default', () => {
		jwt_decode.mockImplementation(() => {
			return { sub: 'guid-id' };
		});
		const { container } = render(<EventList events={events} />);

		expect(container.childNodes).toHaveLength(1);
	});
});
