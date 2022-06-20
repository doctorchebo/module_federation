import React from 'react';
import { render } from '@testing-library/react';
import CustomPlaceHolder from '..';

describe('components/scholarDetail/components/customPlaceHolder', () => {
	it('Should render by default', () => {
		const { container } = render(<CustomPlaceHolder />);
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});
});
