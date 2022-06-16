import React from 'react';
import { render } from '@testing-library/react';
import TotalReport from '../index';
import { Report } from 'helpers/iconTypes';

describe('TotalReport', () => {
	describe('Html structure', () => {
		it('Should render TotalReport', () => {
			const { container } = render(
				<TotalReport icon={Report.success} message='test' extra='test' />
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
