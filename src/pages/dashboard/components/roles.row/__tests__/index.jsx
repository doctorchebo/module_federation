import React from 'react';
import { render } from '@testing-library/react';
import RolesRow from '../index';
import { BrowserRouter } from 'react-router-dom';

const rol = {
	id: 'bd2cf83b-8300-4c35-a266-742afff8f040',
	name: 'junior',
	description: 'System admin',
	deleted: false,
};

describe('pages/dashboard/components/roles.row', () => {
	describe('Html structure', () => {
		it('Should render a role row', () => {
			const { container } = render(
				<BrowserRouter>
					<RolesRow rol={rol} />
				</BrowserRouter>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
			expect(container.firstChild.childNodes).toHaveLength(4);
		});
	});
});
