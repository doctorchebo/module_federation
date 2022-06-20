import React from 'react';
import { render, screen } from '@testing-library/react';
import RichText from '../richText';

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	return render(<RichText {...properties} />);
}

const mockSimpleData = {
	description: 'This is a simple example',
};

const mockFormatData = {
	description:
		'{"blocks":[{"key":"1mpac","text":"This is an example 😜","type":"unstyled","de' +
		'pth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"bgcolor-rgb(84,172,' +
		'210)"},{"offset":4,"length":3,"style":"UNDERLINE"},{"offset":8,"length":2,"styl' +
		'e":"ITALIC"},{"offset":11,"length":7,"style":"BOLD"}],"entityRanges":[],"data":{' +
		'}},{"key":"chv9a","text":"First","type":"unordered-list-item","depth":0,"inlineS' +
		'tyleRanges":[],"entityRanges":[],"data":{}},{"key":"3829r","text":"Second","type' +
		'":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data' +
		'":{}}],"entityMap":{}}',
};

describe('Show Simple Rich Text', () => {
	let component = null;

	beforeEach(() => {
		component = customRender(mockSimpleData);
	});

	afterEach(() => {
		component = null;
	});

	it('Verify with a snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('Verify the content', () => {
		const { container } = component;
		const content = container.querySelector('.container-rich-text');
		expect(content).toBeDefined();
		const textContent = container.querySelector('.rich-text-show').textContent;
		expect(textContent).toBe(mockSimpleData.description);
	});
});

describe('Show Format Rich Text', () => {
	let component = null;

	beforeEach(() => {
		component = customRender(mockFormatData);
	});

	afterEach(() => {
		component = null;
	});

	it('Verify with a snapshot', () => {
		expect(component).toMatchSnapshot();
	});

	it('Verify the content', () => {
		const { container } = component;
		const content = container.querySelector('.container-rich-text');
		expect(content).toBeDefined();
		const findContent = screen.getByText('example');
		expect(findContent).toBeDefined();
		const strongText = screen.getByText((content, element) => {
			return element.tagName.toLowerCase() === 'strong' && content.startsWith('ex');
		});
		expect(strongText.textContent).toBe('example');
		const unOderList = container.querySelectorAll('li');
		expect(unOderList).toHaveLength(2);
	});
});
