import React from 'react';
import { render } from '@testing-library/react';
import Settings from '..';

describe('Settings section page', () => {
	it('should display Settings section in the menu', () => {
		const { container } = render(<Settings />);
		expect(container).toBeDefined();
		expect(container.querySelector('#settings')).toBeDefined();
	});
});
