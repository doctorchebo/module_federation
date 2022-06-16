import { render } from '@testing-library/react';
import React from 'react';
import Summary from '..';

jest.mock('../components/lastEvaluation', () => {
	const ComponentMock = () => <div>Last Evaluation Mock</div>;
	return ComponentMock;
});

jest.mock('../components/stageScore', () => {
	const ComponentMock = () => <div>Stage Score Mock</div>;
	return ComponentMock;
});

jest.mock('../components/event', () => {
	const ComponentMock = () => <div>Event Mock</div>;
	return ComponentMock;
});

/**
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender() {
	const { container } = render(<Summary />);
	return container;
}

describe('components/personal', () => {
	describe('Html structure', () => {
		it('Should render summary tab', () => {
			const container = customRender();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
});
