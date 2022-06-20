/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render } from '@testing-library/react';
import Timeline from '..';
import { timelineProps } from '../__mocks__';
import '@testing-library/jest-dom/extend-expect';
import 'intersection-observer';

/**
 * @returns {object} - rendered component.
 */
function renderTimeline() {
	return render(<Timeline {...timelineProps} />);
}

describe('components/timeline', () => {
	it('Should render timeline with properties.', () => {
		const { container } = renderTimeline();
		expect(container).toBeInstanceOf(HTMLDivElement);
	});

	it('Should contain the class name.', () => {
		const { container } = renderTimeline();
		expect(container.firstChild).toHaveClass('timeline');
	});

	it('Should contain the class name two.', () => {
		const { container } = renderTimeline();
		expect(container.firstChild).toHaveClass('className Test');
	});

	it('Should check the content of the text within the header element.', () => {
		const element = renderTimeline().container.querySelector('.header');
		expect(element.textContent).toBe('title');
	});

	it('Should check the content of the text within the sub header element.', () => {
		const element = renderTimeline().container.querySelector('.sub-header');
		expect(element.textContent).toBe('subtitle');
	});

	it('Should check the content of the text within the description element.', () => {
		const element = renderTimeline().container.querySelector('.description');
		expect(element.textContent).toBe('description');
	});

	it('Should check the node name of the header element.', () => {
		const conta = renderTimeline();
		const x = conta.getByText('title');
		expect(x.nodeName).toBe('HEADER');
	});

	it('Should check the node name of the sub header element.', () => {
		const conta = renderTimeline();
		const x = conta.getByText('subtitle');
		expect(x.nodeName).toBe('SUB');
	});

	it('Should check the node name of the description element.', () => {
		const conta = renderTimeline();
		const x = conta.getByText('description');
		expect(x.nodeName).toBe('P');
	});

	it('Should check the html content of the header element.', () => {
		const element = renderTimeline().container.querySelector('.header');
		expect(element).toContainHTML('<header class="header">title</header>');
	});

	it('Should check the html content of the sub header element.', () => {
		const element = renderTimeline().container.querySelector('.sub-header');
		expect(element).toContainHTML('<sub class="sub-header">subtitle</sub>');
	});

	it('Should check the html content of the description element.', () => {
		const element = renderTimeline().container.querySelector('.description');
		expect(element).toContainHTML('<p class="description">description</p>');
	});
});
