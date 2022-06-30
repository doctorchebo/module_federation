import React from 'react';
import Button from './index';
import { render } from '@testing-library/react';
import { Icon } from 'semantic-ui-react';

describe('HTML structure', () => {
	it('should render a button with its default properties', () => {
		const { container } = render(<Button value='Login' />);
		const button = container.querySelector('button');
		expect(container).toBeInstanceOf(HTMLDivElement);
		expect(button).toBeInstanceOf(HTMLButtonElement);
	});

	it('className prop should be optional', () => {
		const { container } = render(<Button value='Login' />);
		const button = container.querySelector('button');
		expect(button).toBeInstanceOf(HTMLButtonElement);
	});

	it('Should render with name added in value prop', () => {
		const name = 'Login';
		const { container } = render(<Button value={name} />);
		const button = container.querySelector('button');
		expect(button?.textContent).toBe(name);
	});

	it('Should render with a default icon', () => {
		const name = 'Login';
		const { container } = render(<Button value={name} />);
		const icon = container.querySelector('.ico');
		expect(icon).toBeDefined();
	});

	it('Should render as disabled', () => {
		const name = 'Login';
		const disabled = true;
		const { container } = render(<Button value={name} disabled={disabled} />);
		const button = container.querySelector('button');
		expect(button).toBeDisabled();
	});
});
