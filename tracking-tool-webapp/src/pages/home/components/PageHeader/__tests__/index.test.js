import React from 'react';
import PageHeader from '../.';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const headerConstants = {
	appName: 'Applicants Tracker',
	subtitle: 'An app for applicants in the Software Industry.',
	getStarted: 'Get Started',
};

describe('pages/home/components/PageHeader', () => {
	describe('Html structure', () => {
		it('should render with default props', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('should match snapshot', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			expect(container.firstChild).toMatchSnapshot();
		});

		it('header should be instance of header', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			const header = container.querySelector('.ui.inverted.header.main-title');
			expect(header).toBeInstanceOf(HTMLHeadingElement);
		});

		it('header content should be what is expected', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			const header = container.querySelector('.ui.inverted.header.main-title');
			expect(header.innerHTML).toBe(headerConstants.appName);
		});
		it('h2 should be instance of header', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			const header = container.querySelector('.ui.header.sub-title');
			expect(header).toBeInstanceOf(HTMLHeadingElement);
		});

		it('h2 content should be what is expected', () => {
			const { container } = render(<PageHeader constants={headerConstants} />, {
				wrapper: MemoryRouter,
			});
			const header = container.querySelector('.ui.header.sub-title');
			expect(header.innerHTML).toBe(headerConstants.subtitle);
		});
	});
});
