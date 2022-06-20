import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from '../index';

const countryOptions = [
	{ key: 'af', value: 'af', text: 'Afghanistan' },
	{ key: 'ax', value: 'ax', text: 'Aland Islands' },
	{ key: 'al', value: 'al', text: 'Albania' },
];

describe('SelectAdapterComponent', () => {
	describe('Html structure', () => {
		it('Should render dropdown by default', () => {
			const { container } = render(<Select options={countryOptions} />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('Handling dropdown events', () => {
		it('Should change the value selected when choose an option', () => {
			const onChangeMock = jest.fn(({ target }) => target.value);
			const { getAllByRole } = render(
				<Select options={countryOptions} onChange={onChangeMock} />
			);
			const optionElement = getAllByRole('option')[0];
			fireEvent.click(optionElement);
			expect(onChangeMock).toBeCalledTimes(1);
			expect(onChangeMock.mock.results[0].value).toBe('af');
		});
	});
});
