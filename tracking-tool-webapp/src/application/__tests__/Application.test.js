import React from 'react';
import { render } from '@testing-library/react';
import Application from 'application';
import { BrowserRouter } from 'react-router-dom';
import { ApplicationDataProvider } from 'application/context/AppContext';

describe('application', () => {
	describe('Html structure', () => {
		it('Should render application', () => {
			const { container } = render(
				<ApplicationDataProvider>
					<BrowserRouter>
						<Application />
					</BrowserRouter>
				</ApplicationDataProvider>
			);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
});
