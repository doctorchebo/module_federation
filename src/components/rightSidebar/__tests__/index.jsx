import React from 'react';
import { render } from '@testing-library/react';
import RightSidebar from '..';

describe('components/importSidebar', () => {
	describe('HTML Structure', () => {
		it('Should render a sidebar with default properties', () => {
			const { container } = render(<RightSidebar />);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render a sidebar with personalized width', () => {
			const { container } = render(<RightSidebar width={'wide'} />);
			expect(container.firstChild.className).toContain('wide');
		});

		it('Should render a sidebar with additional classes', () => {
			const { container } = render(<RightSidebar className={'test'} />);
			expect(container.firstChild.className).toContain('test');
		});
	});
});
