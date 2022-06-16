import React from 'react';
import { render } from '@testing-library/react';
import ApprovalHistoryRow from '..';
import { BrowserRouter } from 'react-router-dom';

const data = {
	activity: 'Postulation',
	entered: '50',
	inProgress: '31',
	failed: '14',
	approved: '5',
};

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<ApprovalHistoryRow {...properties} />, {
		container: document.createElement('tbody'),
		wrapper: BrowserRouter,
	});
	const element = container.querySelector('[name="Custom-Row"]');

	return element;
}

describe('components/approval.history.row', () => {
	it('Should render approval history information', () => {
		const element = customRender({ item: data, numberOfCells: 5 });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableRowElement);
	});

	it('Should render data from parameters (rows)', () => {
		const element = customRender({
			item: data,
			numberOfCells: 5,
		});
		expect(element.querySelector('[name="activity"]').textContent).toBe(data.activity);
		expect(element.querySelector('[name="entered"]').textContent).toBe(data.entered);
		expect(element.querySelector('[name="inProgress"]').textContent).toBe(data.inProgress);
		expect(element.querySelector('[name="failed"]').textContent).toBe(data.failed);
		expect(element.querySelector('[name="approved"]').textContent).toBe(data.approved);
	});
});
