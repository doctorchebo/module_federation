import React from 'react';
import { render } from '@testing-library/react';
import ActionsMenu from '..';

const itemList = [{ name: 'Events' }, { name: 'Add Event' }, { name: 'Evaluate' }];

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<ActionsMenu {...properties} />);
	const element = container.querySelector('[name="Actions-Menu"]');

	return element;
}

describe('src/components/actionsMenu', () => {
	it('Should render a DropDown element when expanded attribute is false', () => {
		const element = customRender({ itemList });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
		expect(element.classList.contains('dropdown')).toEqual(true);
	});
	it('Should render a List element when expanded attribute is true', () => {
		const element = customRender({ itemList, expanded: true });

		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLDivElement);
		expect(element.classList.contains('list')).toEqual(true);
	});

	it('Should show the name of the items passed by parameter', () => {
		const element = customRender({ itemList, expanded: true });

		const menu1 = element.querySelector('[name="Events"]');
		const menu2 = element.querySelector('[name="Add Event"]');
		const menu3 = element.querySelector('[name="Evaluate"]');

		expect(menu1).toBeDefined();
		expect(menu2).toBeDefined();
		expect(menu3).toBeDefined();
	});
});
