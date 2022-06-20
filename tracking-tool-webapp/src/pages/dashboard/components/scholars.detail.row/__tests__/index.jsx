import React from 'react';
import { render } from '@testing-library/react';
import ScholarsDetailRow from '..';

/**
 *
 * @param {object} properties Properties of component
 * @returns {React.Component} Returns ScholarRowDetails component
 */
function customRender(properties) {
	const tableBody = document.createElement('tbody');
	const { container } = render(<ScholarsDetailRow {...properties} />, {
		container: document.body.appendChild(tableBody),
	});
	const root = container.querySelector('.detail-row');

	return {
		root,
		container,
	};
}

describe('pages/dashboard/components/scholars.detail.row', () => {
	describe('HTML Structure', () => {
		test('Should render scholar details by default', () => {
			const { root } = customRender();
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLTableRowElement);
		});
		test('Should render scholars with custom numberOfCells property', () => {
			const numberOfCells = 6;
			const { root } = customRender({ numberOfCells });
			expect(root.firstChild.colSpan).toEqual(numberOfCells);
		});
		test('Should render scholars with children property', () => {
			const contentText = 'Content';
			const children = <>{contentText}</>;
			const { root } = customRender({ children });
			expect(root).toHaveTextContent(contentText);
		});
	});
});
