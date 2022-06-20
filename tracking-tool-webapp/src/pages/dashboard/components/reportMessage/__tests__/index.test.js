import React from 'react';
import { render } from '@testing-library/react';
import ReportMessage from '../index';

describe('pages/profile/components/card', () => {
	describe('Html structure', () => {
		it('Should render card', () => {
			const { container } = render(<ReportMessage />);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
			expect(container.firstChild.childNodes).toHaveLength(2);
		});
	});
});
