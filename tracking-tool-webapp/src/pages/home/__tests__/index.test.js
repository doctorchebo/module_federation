import React from 'react';
import { render } from '@testing-library/react';
import Home from '../index';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import englishMessages from 'application/languages/en-US.json';
import { languages } from 'application/enums';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/home', () => {
	describe('Html structure', () => {
		it('Should render about', () => {
			const { container } = renderWithRouter(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Home />
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
