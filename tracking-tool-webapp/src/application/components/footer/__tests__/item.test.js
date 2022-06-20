import React from 'react';
import { render } from '@testing-library/react';
import Item from '../item';
import { IntlProvider } from 'react-intl';
import englishMessages from 'application/languages/en-US.json';
import { languages } from '../../../enums';

const item = {
	headerContent: 'Team A',
	bodyContent: ['All pain No gain'],
};
let bodyContent = 'All pain No gain';

describe('components/footer/item', () => {
	describe('Html structure', () => {
		it('Should render item', () => {
			const { container } = render(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Item
						headerContent={item.headerContent}
						bodyContent={item.bodyContent}
						socialIcons={item.socialIcons}
					/>
				</IntlProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render item with string', () => {
			const { container } = render(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Item
						headerContent={item.headerContent}
						bodyContent={item.bodyContent}
						socialIcons={item.socialIcons}
					/>
				</IntlProvider>
			);
			const content = container.querySelector('.item');
			expect(content.textContent).toEqual(bodyContent);
		});

		it('Should not be equal string', () => {
			bodyContent = 'Another';

			const { container } = render(
				<IntlProvider locale={languages.english} messages={englishMessages}>
					<Item
						headerContent={item.headerContent}
						bodyContent={item.bodyContent}
						socialIcons={item.socialIcons}
					/>
				</IntlProvider>
			);
			const content = container.querySelector('.item');
			expect(content.textContent).not.toEqual(bodyContent);
		});
	});
});
