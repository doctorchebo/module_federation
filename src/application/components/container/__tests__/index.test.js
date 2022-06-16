import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import DesktopContainer from '../index';
import { IntlProvider } from 'react-intl';
import englishMessages from 'application/languages/en-US.json';
import { languages } from '../../../enums';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('components/container', () => {
	describe('Html structure', () => {
		it('Should render container', () => {
			const { container } = renderWithRouter(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<DesktopContainer />
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
