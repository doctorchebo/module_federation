import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Search from '../index';

const selectSearchValue = jest.fn();
const search = jest.fn();
const filter = 'Andres';
const searchValueRef = {
	current: 'Mauricio',
};

describe('pages/dashboard/components/search', () => {
	test('should call handleClick', () => {
		const { container } = render(
			<Search
				selectSearchValue={selectSearchValue}
				filterValue={filter}
				searchValueRef={searchValueRef}
			/>
		);
		const button = container.querySelector('Button');
		fireEvent.click(button, { target: { value: filter } });
		expect(selectSearchValue).toHaveBeenCalled();
	});
	test('should call handleChange', () => {
		const { container } = render(
			<Search
				selectSearchValue={selectSearchValue}
				filterValue={filter}
				search={search}
				searchValueRef={searchValueRef}
			/>
		);
		const input = container.querySelector('Input');
		fireEvent.change(input, { target: { value: filter } });
		expect(input.value).toBe(filter);
	});
});
