import React from 'react';
import { render } from '@testing-library/react';
import SubjectTable from '..';
import { BrowserRouter } from 'react-router-dom';

const subjects = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		programVersion: 'Dev31',
		subject: 'Angular',
	},
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd323',
		programVersion: 'Dev31',
		subject: 'RXJS',
	},
];
/**
 * @returns {object} - rendered component.
 */
function customRender() {
	const { container, asFragment } = render(
		<BrowserRouter>
			<SubjectTable props={subjects} />
		</BrowserRouter>
	);

	return { container, asFragment };
}

describe('pages/dashboard/components/subject.table', () => {
	it('Should render subject table element', () => {
		const { container } = customRender();
		const table = container.querySelector('[name="Subjects-Table"]');
		expect(container).toBeDefined();
		expect(container).toBeInstanceOf(HTMLDivElement);
		expect(table.children[0]).toBeInstanceOf(HTMLTableSectionElement);
	});
});
