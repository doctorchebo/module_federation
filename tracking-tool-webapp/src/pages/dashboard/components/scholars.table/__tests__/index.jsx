import React from 'react';
import { render } from '@testing-library/react';
import ScholarsTable from '..';
import { BrowserRouter } from 'react-router-dom';

const listScholars = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		programVersionName: null,
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2acd323',
		person: {
			currentCity: 'Tarija',
			fullName: 'Person 1 Last Name 1',
			personalEmail: 'person@person.com',
			phoneNumber: '123123123123',
		},
		programVersionName: null,
	},
];

const mockAction = {
	changePaginator: jest.fn(),
};

jest.mock('pages/dashboard/sections/scholars/context', () => {
	const state = { isChangePaginator: false };
	return {
		useScholarsContext: () => {
			return [state, mockAction];
		},
	};
});

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(
		<BrowserRouter>
			<ScholarsTable {...properties} />
		</BrowserRouter>
	);
	const element = container.querySelector('[name="Scholars-Table"]');

	return element;
}

describe('pages/dashboard/components/scholars.table', () => {
	it('Should render scholar table element', () => {
		const element = customRender({ value: listScholars });
		const table = document.querySelector('[name="Scholars-Table"]');
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableElement);
		expect(table.children[0]).toBeInstanceOf(HTMLTableSectionElement);
	});
});
