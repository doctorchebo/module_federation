import React from 'react';
import { render } from '@testing-library/react';
import Icon from '..';

describe('components/icon', () => {
	describe('HTML Structure', () => {
		it('Should render an empty icon', () => {
			const { container } = render(<Icon />);
			expect(container).toBeDefined();
		});

		it('Should render a academic cap icon', () => {
			const { container } = render(<Icon name={'academic-cap'} />);
			const iconPath = container.querySelector('[name="academic-cap"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a annotation icon', () => {
			const { container } = render(<Icon name={'annotation'} />);
			const iconPath = container.querySelector('[name="annotation"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render an archive icon', () => {
			const { container } = render(<Icon name={'archive'} />);
			const iconPath = container.querySelector('[name="archive"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a bell icon', () => {
			const { container } = render(<Icon name={'bell'} />);
			const iconPath = container.querySelector('[name="bell"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a check circle icon', () => {
			const { container } = render(<Icon name={'check-circle'} />);
			const iconPath = container.querySelector('[name="check-circle"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a check icon', () => {
			const { container } = render(<Icon name={'check'} />);
			const iconPath = container.querySelector('[name="check"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a chevron left icon', () => {
			const { container } = render(<Icon name={'chevron-left'} />);
			const iconPath = container.querySelector('[name="chevron-left"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a chevron right icon', () => {
			const { container } = render(<Icon name={'chevron-right'} />);
			const iconPath = container.querySelector('[name="chevron-right"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a chevron down icon', () => {
			const { container } = render(<Icon name={'chevron-down'} />);
			const iconPath = container.querySelector('[name="chevron-down"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a chevron up icon', () => {
			const { container } = render(<Icon name={'chevron-up'} />);
			const iconPath = container.querySelector('[name="chevron-up"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a clipboard check icon', () => {
			const { container } = render(<Icon name={'clipboard-check'} />);
			const iconPath = container.querySelector('[name="clipboard-check"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a cloud upload icon', () => {
			const { container } = render(<Icon name={'cloud-upload'} />);
			const iconPath = container.querySelector('[name="cloud-upload"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a dots vertical icon', () => {
			const { container } = render(<Icon name={'dots-vertical'} />);
			const iconPath = container.querySelector('[name="dots-vertical"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a filter icon', () => {
			const { container } = render(<Icon name={'filter'} />);
			const iconPath = container.querySelector('[name="filter"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a home icon', () => {
			const { container } = render(<Icon name={'home'} />);
			const iconPath = container.querySelector('[name="home"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a pencil alt icon', () => {
			const { container } = render(<Icon name={'pencil-alt'} />);
			const iconPath = container.querySelector('[name="pencil-alt"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a plus icon', () => {
			const { container } = render(<Icon name={'plus'} />);
			const iconPath = container.querySelector('[name="plus"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a refresh icon', () => {
			const { container } = render(<Icon name={'refresh'} />);
			const iconPath = container.querySelector('[name="refresh"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a search icon', () => {
			const { container } = render(<Icon name={'search'} />);
			const iconPath = container.querySelector('[name="search"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a user circle icon', () => {
			const { container } = render(<Icon name={'user-circle'} />);
			const iconPath = container.querySelector('[name="user-circle"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a x icon', () => {
			const { container } = render(<Icon name={'x'} />);
			const iconPath = container.querySelector('[name="x"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a user icon', () => {
			const { container } = render(<Icon name={'user'} />);
			const iconPath = container.querySelector('[name="user"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});

		it('Should render a icon and tooltip', () => {
			const { container } = render(<Icon name={'trash'} tooltipText={'Delete'} />);
			const iconPath = container.querySelector('[name="trash"]');
			expect(iconPath).toBeDefined();
			expect(container.firstChild.nodeName).toBe('svg');
		});
	});
});
