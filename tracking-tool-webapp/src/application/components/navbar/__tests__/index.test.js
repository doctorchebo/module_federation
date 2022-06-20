import { render } from '@testing-library/react';
import React from 'react';
import Navbar from '../index';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import englishMessages from 'application/languages/en-US.json';
import { languages } from '../../../enums';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('components/navbar', () => {
	describe('Html structure', () => {
		it('Should render navbar', () => {
			const { container } = renderWithRouter(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Navbar items={'/'} />
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
		it('Test', () => {
			const { container } = renderWithRouter(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Navbar items={'/'} fixed={true} />
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
