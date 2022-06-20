import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import ScholarCard from '..';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);
	return render(ui, { wrapper: BrowserRouter });
};

describe('pages/dashboard/components/scholar.card', () => {
	describe('HTML structure', () => {
		test('Should render by default', () => {
			const { container } = renderWithRouter(<ScholarCard />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
		test('Should render data from properties', () => {
			const properties = {
				value: {
					fullName: 'Edson Quispe Fuertes',
					scholarStatus: 'Active',
				},
			};
			const { container } = renderWithRouter(<ScholarCard {...properties} />);
			const cardHeader = container.querySelector('[name="card-header"]');
			const cardMetadata = container.querySelector('[name="card-metadata"]');

			expect(cardHeader).toHaveTextContent(properties.value.fullName);
			expect(cardMetadata).toHaveTextContent(properties.value.scholarStatus);
		});

		test('Should have completed class the card-metadata section', () => {
			const properties = {
				value: { scholarStatus: 'Completed' },
			};
			const { container } = renderWithRouter(<ScholarCard {...properties} />);
			const cardMetadata = container.querySelector('[name="card-metadata"]');

			expect(cardMetadata).toHaveClass('completed');
		});

		test('Should have the URL to the scholar evaluation', () => {
			const properties = {
				value: {
					evaluationUrl:
						'/dashboard/scholars/e3334564-f329-43e8-b21f-9db015075462/evaluation',
				},
			};
			const { container } = renderWithRouter(<ScholarCard {...properties} />);
			const cardHeader = container.querySelector('[name="card-header"]');
			console.log(cardHeader);

			expect(cardHeader).toHaveAttribute('href', properties.value.evaluationUrl);
		});
	});
});
