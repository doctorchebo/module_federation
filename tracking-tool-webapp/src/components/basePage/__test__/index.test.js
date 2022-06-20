import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BasePage from '..';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);
	return render(ui, { wrapper: BrowserRouter });
};

describe('components/basePage', () => {
	describe('Html structure', () => {
		it('Should render basic page', () => {
			const { container } = renderWithRouter(<BasePage />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render with basic params', () => {
			const title = 'Verify Your Email';
			const iconStructure = '<i aria-hidden="true" class="home icon"></i>';
			const body = <div>Any Body</div>;
			const { container } = renderWithRouter(
				<BasePage goTo={'/'} title={title} icon='home' body={body} />
			);
			const header = container.querySelector('.header');
			const bodyRendered = container.querySelector('.body-generic');
			const button = container.querySelector('#home-button');
			expect(header.textContent).toBe(title);
			expect(bodyRendered.innerHTML).toEqual('<div>Any Body</div>');
			expect(button.innerHTML).toEqual(iconStructure);
		});
	});
});
