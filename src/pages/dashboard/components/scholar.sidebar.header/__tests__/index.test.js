import React from 'react';
import { render } from '@testing-library/react';
import SidebarEventList from '..';
import locale from '../../../locale/en.json';

const user = 'Julio Martinez';

describe('pages/dashboard/sections/scholars/components/sidebarEventList', () => {
	it('Should render by default', () => {
		const { container } = render(<SidebarEventList user={user} title='' />);

		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});

	it('Should render user and title event', () => {
		const { getByText } = render(<SidebarEventList user={user} title={locale.event} />);

		const userName = getByText('Julio Martinez');

		expect(userName.textContent).toBe('Julio Martinez');
	});

	it('Should render user and title Enroll in Program', () => {
		const { getByText } = render(<SidebarEventList user={user} title={locale.program} />);

		const userName = getByText('Julio Martinez');

		expect(userName.textContent).toBe('Julio Martinez');
	});
});
