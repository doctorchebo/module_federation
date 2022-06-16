import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Rating from '..';

/**
 * Render a Lst componenent
 *
 * @param {*} props Properties
 * @returns {*} a Approval list to test
 */
function customRender(props) {
	const { container } = render(<Rating {...props} />);
	return container;
}

describe('components/rating', () => {
	describe('HTML structure', () => {
		it('Should render an Approval list with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.firstChild).toBeInstanceOf(HTMLElement);
		});

		it('Should render a tittle for list', () => {
			const element = customRender();
			const items = element.querySelectorAll('.rating-item');

			expect(items).toBeDefined();
			expect(items).toHaveLength(5);
		});
	});

	describe('Mouse events', () => {
		it('Should select items onMouseEnter and deselect items onMouseLeave', () => {
			const element = customRender();
			const item = element.querySelector('.rating-item');
			const icon = item.querySelector('.ui.tiny.progress');
			fireEvent.mouseEnter(item);
			expect(icon).toHaveClass('selected');
			fireEvent.mouseLeave(item);
			expect(icon).not.toHaveClass('selected');
		});

		it('Should call onChange action when click item', () => {
			const onChangeMock = jest.fn((value) => value);
			const element = customRender({ onChange: onChangeMock });
			const item = element.querySelector('.rating-item');
			fireEvent.click(item);
			expect(onChangeMock).toBeCalled();
			expect(onChangeMock.mock.calls).toHaveLength(1);
			expect(onChangeMock.mock.results[0].value).toBe(1);
		});
	});
});
