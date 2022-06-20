import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '..';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		goBack: jest.fn(),
	}),
}));

describe('components/notFound', () => {
	it('Should render by default', () => {
		const { container } = render(<NotFound />);
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});
});
