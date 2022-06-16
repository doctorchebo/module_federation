import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AlertPopup from '..';

describe('components/alertPopup', () => {
	describe('Html structure', () => {
		it('Should render popup', () => {
			const { container } = render(<AlertPopup />);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Events', () => {
		it('Dismiss icon on click', async () => {
			const dismiss = true;
			const setDismiss = jest.fn();
			const { container } = render(<AlertPopup dismiss={dismiss} setDismiss={setDismiss} />);
			const iconDismiss = container.querySelector('.close');
			fireEvent.click(iconDismiss);
			expect(setDismiss).toHaveBeenCalledTimes(1);
		});
	});
});
