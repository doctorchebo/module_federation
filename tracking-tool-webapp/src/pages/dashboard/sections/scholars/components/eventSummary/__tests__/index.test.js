import React from 'react';
import { render } from '@testing-library/react';
import EventManager from 'pages/dashboard/components/eventsManager';

jest.mock('pages/dashboard/components/eventsManager/views', () => {
	const componentMock = () => <div>EventCardListView</div>;
	return componentMock;
});

/**
 * @returns {HTMLElement} Returns an Html Element.
 */
describe('Event Summary', () => {
	let wrapper;
	const user = {
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
	};

	beforeEach(() => {
		wrapper = render(<EventManager user={user} />);
	});

	it('Should render Event Manager', () => {
		const { container } = wrapper;
		expect(container.textContent).toMatch('EventCardListView');
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
