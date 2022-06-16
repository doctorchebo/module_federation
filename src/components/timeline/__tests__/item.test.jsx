/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render } from '@testing-library/react';
import TimelineItem from '../item';
import { timelineItemProps } from '../__mocks__';
import '@testing-library/jest-dom/extend-expect';
import 'intersection-observer';

/**
 * @returns {object} - rendered component.
 */
function renderTimelineItem() {
	const { container } = render(<TimelineItem {...timelineItemProps} />);
	return container;
}

describe('components/timelineItem', () => {
	it('Should render timeline with properties.', () => {
		expect(renderTimelineItem()).toBeInstanceOf(HTMLDivElement);
	});

	it('Should contain the class name.', () => {
		expect(renderTimelineItem().firstChild).toHaveClass('timelineItem');
	});

	it('Should contain the class name two.', () => {
		expect(renderTimelineItem().firstChild).toHaveClass('timeline-item');
	});

	it('Should check the content of the text within the header element.', () => {
		const element = renderTimelineItem().querySelector('.header');
		expect(element.textContent).toBe('title test');
	});

	it('Should check the content of the text within the sub-header element.', () => {
		const element = renderTimelineItem().querySelector('.sub-header');
		expect(element.textContent).toBe('sub-title test');
	});

	it('Should check the content of the text within the description element.', () => {
		const element = renderTimelineItem().querySelector('.description');
		expect(element.textContent).toBe('description test');
	});
});
