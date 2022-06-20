import React from 'react';
import { render } from '@testing-library/react';
import MessageLogin from '../index';

describe('pages/login/components/message', () => {
	describe('Html structure', () => {
		it('Should render message', () => {
			const { container } = render(<MessageLogin value={'message'} />);
			expect(container.firstChild).toBeInstanceOf(HTMLLabelElement);
			expect(container.firstChild.childNodes).toHaveLength(1);
		});
	});
});
