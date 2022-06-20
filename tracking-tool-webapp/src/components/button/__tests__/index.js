import React from 'react';
import { render } from '@testing-library/react';
import Button from '..';
import Icon from 'components/icon';

describe('components/elements/button', () => {
	describe('Html structure', () => {
		it('Should render button with default properties', () => {
			const { container } = render(<Button />);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render button with string content', () => {
			const { container } = render(<Button content={'test content'} />);
			const content = container.querySelector('.content');
			expect(content.textContent).toBe('test content');
		});

		it('Should render button with string content passed as children', () => {
			const { container } = render(<Button>{'test content'}</Button>);
			const content = container.querySelector('.content');
			expect(content.textContent).toBe('test content');
		});

		it('Should render button with personalized icon', () => {
			const icon = <Icon name={'plus'} />;
			const { container } = render(<Button icon={icon} />);
			const content = container.querySelector('.icon');
			expect(content).toBeDefined();
			expect(content.firstChild.nodeName).toBe('svg');
		});

		it('Should render button without any icon', () => {
			const { container } = render(<Button />);
			const content = container.querySelector('.icon');
			expect(content).toBeNull();
		});

		it('Should render button with additional classname', () => {
			const { container } = render(<Button className={'test'} />);
			const className = container.firstChild.className;
			expect(className.includes('test')).toBe(true);
		});
	});
});
