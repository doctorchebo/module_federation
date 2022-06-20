import React from 'react';
import { render } from '@testing-library/react';
import ImportHeader from '../';

describe('pages/dashboard/components/importHeader', () => {
	describe('Html structure', () => {
		it('Should render items with default properties', () => {
			const { container } = render(<ImportHeader />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
		it('Should render title given in properties', () => {
			const { container } = render(
				<ImportHeader title={'Test title'} subTitle={'Test subtitle'} />
			);
			expect(container.querySelector('.sidebar-header-title').textContent).toBe('Test title');
		});
		it('Should render subtitle given in properties', () => {
			const { container } = render(
				<ImportHeader title={'Test title'} subTitle={'Test subtitle'} />
			);
			expect(container.querySelector('.sidebar-header-subTitle').textContent).toBe(
				'Test subtitle'
			);
		});
	});
});
