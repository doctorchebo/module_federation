import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../index';
import { IntlProvider } from 'react-intl';
import englishMessages from 'application/languages/en-US.json';
import { languages } from '../../../enums';

describe('components/footer', () => {
	describe('Html structure', () => {
		it('Should render footer', () => {
			const { container } = render(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Footer />
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
		});
	});
});
