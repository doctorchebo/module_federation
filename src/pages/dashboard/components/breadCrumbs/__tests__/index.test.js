import React from 'react';
import BreadCrumbs from '..';
import { render } from '@testing-library/react';

const breadCrumbsMock = {
	breadCrumbs: {
		icon: 'home',
		list: [
			{ key: 'scholars', content: 'scholars', active: true },
			{ key: 'evaluations', content: 'evaluations', active: true },
		],
	},
};

const mockAction = {
	onBreadcrumbsLoad: jest.fn(),
};

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	return {
		useBreadcrumbsContext: () => {
			return [breadCrumbsMock, mockAction];
		},
	};
});

describe('pages/dashboard/components/breadCrumbs', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = render(<BreadCrumbs />);
	});
	it('Should render breadCrumbs', () => {
		const { container } = wrapper;
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});

	it('Should display the breadcrumb text', () => {
		const content = wrapper;
		expect(content.container).toHaveTextContent('scholars');
	});

	it('Should show the text of the navigation subpath', () => {
		const content = wrapper;
		expect(content.container).toHaveTextContent('evaluations');
	});

	it('Should show the icon of the navigation', () => {
		const { container } = wrapper;
		const [icon] = container.getElementsByClassName('home');
		expect(icon).toBeInstanceOf(HTMLElement);
	});

	it('Should not show the icon of the navigation', () => {
		const { container } = wrapper;
		const [icon] = container.getElementsByClassName('profile');
		expect(icon).not.toBeInstanceOf(HTMLElement);
	});
});
