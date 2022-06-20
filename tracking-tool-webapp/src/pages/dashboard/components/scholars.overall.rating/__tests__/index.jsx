import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ScholarsOverallRating from '..';
import locale from 'pages/dashboard/locale/en.json';

describe('scholars/components/overallRating', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<ScholarsOverallRating />);
			const content = container.querySelector('.overall-rating .content');

			expect(content).toBeDefined();
			expect(content.textContent).toBe(locale.scholars.overallRating.content);
		});
	});

	describe('Event handlers', () => {
		test('Should call the onChange action when change the value of input', () => {
			const onChangeMock = jest.fn((name, value) => ({ name, value }));
			const properties = {
				name: 'average',
				average: 51,
				onChange: onChangeMock,
			};
			const newAverage = properties.average + 1;
			const { container } = render(<ScholarsOverallRating {...properties} />);

			const input = container.querySelector('input');
			fireEvent.change(input, { target: { value: newAverage } });
			expect(onChangeMock.mock.calls).toHaveLength(1);
			expect(onChangeMock.mock.results[0].value).toStrictEqual({
				name: properties.name,
				value: newAverage.toString(),
			});
		});
	});
});
