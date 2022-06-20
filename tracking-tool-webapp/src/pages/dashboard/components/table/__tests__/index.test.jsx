import React from 'react';
import { render } from '@testing-library/react';
import { usersTest } from 'helpers/table';
import UsersTable from '../index';

describe('UsersTable component', () => {
	it('has a SideMenu component to show', () => {
		const { container } = render(<UsersTable users={usersTest} />);
		expect(container.firstChild).toBeInstanceOf(HTMLTableElement);
	});
});
