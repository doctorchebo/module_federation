import React from 'react';
import { render } from '@testing-library/react';
import MenuDropdown from '..';

describe('components/menu', () => {
	describe('HTML Structure', () => {
		test('Should render menu dropdown', () => {
			const { container } = render(<MenuDropdown />);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		const options = [
			{
				name: 'Option 1',
				key: 'option1',
				list: [
					{
						text: '1',
						value: 1,
					},
				],
			},
			{
				name: 'Option 2',
				key: 'option2',
				list: [
					{
						text: '1',
						value: 1,
					},
					{
						text: '2',
						value: 2,
					},
				],
			},
		];
		test('Should find the "option 1" text', () => {
			const { container } = render(<MenuDropdown options={options} />);
			expect(container).toHaveTextContent('Option 1');
		});
	});
});
