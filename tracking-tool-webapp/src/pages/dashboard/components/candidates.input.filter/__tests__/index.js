import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidatesInputFilter from '..';
import { BrowserRouter } from 'react-router-dom';

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(
		<BrowserRouter>
			<CandidatesInputFilter {...properties} />
		</BrowserRouter>
	);
	const element = container.querySelector('[type="text"]');

	return element;
}

describe('pages/dashboard/components/candidates.input.filter', () => {
	it('Should render input element with its placeholder', () => {
		const element = customRender({
			setFilter: (input) => {
				return input;
			},
			placeholder: 'search',
		});
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLInputElement);
		expect(screen.queryByPlaceholderText(/search/i)).toBeInTheDocument();
	});
});
