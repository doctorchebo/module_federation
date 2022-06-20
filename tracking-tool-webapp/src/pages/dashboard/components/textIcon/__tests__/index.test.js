import React from 'react';
import { render } from '@testing-library/react';
import TextIcon from '..';

describe('pages/dashboard/components/textIcon', () => {
	describe('Html structure', () => {
		it('Should render textIcon', () => {
			const { container } = render(<TextIcon color='blue' name='home' hidden='text' />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
