import { render } from '@testing-library/react';
import React from 'react';
import { Table } from 'semantic-ui-react';
import SummaryItem from '../item.jsx';

/**
 * @param {object} infoScholar Get the object infoScholar
 * @returns {HTMLElement} Returns an Html Element Table.
 */
function customRender(infoScholar) {
	const { container } = render(
		<Table className='table-container'>
			<Table.Body>
				<SummaryItem item={infoScholar} />
			</Table.Body>
		</Table>
	);
	return container;
}

const mockData = {
	version: 'Dev30',
	stage: 'Not Started',
	duration: 'Jan 14, 2020 to Sep 14, 2020',
	grade: '0',
	stageData: {
		scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
		programVersionId: '4fffc534-1d83-13d5-b264-1e17f2abd322',
	},
};

describe('components/personal', () => {
	it('Shoul render a Row with a right arrow', () => {
		const container = customRender(mockData);
		const iconClass = container.querySelector('.angle');
		const cantIconClass = container.getElementsByClassName('angle right icon').length;
		expect(container).toBeInstanceOf(HTMLDivElement);
		expect(iconClass.className).toBe('angle right icon');
		expect(cantIconClass).toBe(1);
	});
});
