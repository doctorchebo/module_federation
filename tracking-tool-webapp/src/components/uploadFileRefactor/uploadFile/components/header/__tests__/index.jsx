import React from 'react';
import { render } from '@testing-library/react';
import HeaderTitle from '../';

describe('pages/dashboard/components/importHeader', () => {
	describe('Html structure', () => {
		it('Should render by default', () => {
			const { container } = render(<HeaderTitle />);
			const header = container.querySelector('.header');
			expect(header).toBeDefined();
		});

		it('Should render title given in properties', () => {
			const { container } = render(
				<HeaderTitle title={'Test title'} subTitle={'Test subtitle'} />
			);
			expect(container.querySelector('.title').textContent).toBe('Test title');
		});

		it('Should render subtitle given in properties', () => {
			const { container } = render(
				<HeaderTitle title={'Test title'} subTitle={'Test subtitle'} />
			);
			expect(container.querySelector('.subtitle').textContent).toBe('Test subtitle');
		});
	});
});
