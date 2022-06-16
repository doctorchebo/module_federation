import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ProfileTabs from '..';
import Summary from 'pages/dashboard/sections/scholars/components/summary';
import Training from 'pages/dashboard/sections/scholars/components/training';
import States from 'pages/dashboard/sections/scholars/components/states';
import Personal from 'pages/dashboard/sections/scholars/components/personal';
import locale from 'pages/dashboard/locale/en.json';

const properties = {
	user: {
		id: '06832a4d-200d-42d7-9a5e-051f29c29e31',
		User: 'Erick Lan',
		EmailAddress: 'erick.lan@gmail.com',
		PhoneNumber: '77777777',
		City: 'Santa Cruz',
		Version: 'Dev32',
		programVersionId: '36c8ae23-e4be-4f37-9d2f-af6c3d7e62dd',
		Status: 'Completed',
		StatusClass: 'completed',
	},
	showFormEvent: false,
	showUpdateForm: false,
	showChangeStatusForm: false,
};

const tabMenu = { ...locale.scholars.tabMenu };
/**
 * Renders the MainTabs component
 *
 * @returns {React.Component} ScholarsTab component
 */
function customRender() {
	return render(<ProfileTabs items={tabs} />);
}

jest.mock('pages/dashboard/sections/scholars/components/summary', () => {
	const mockTab = () => <div>Mock Tab</div>;
	return mockTab;
});
jest.mock('pages/dashboard/sections/scholars/components/training', () => {
	const mockTab = () => <div>Mock Tab</div>;
	return mockTab;
});
jest.mock('pages/dashboard/sections/scholars/components/states', () => {
	const mockTab = () => <div>Mock Tab</div>;
	return mockTab;
});
jest.mock('pages/dashboard/sections/scholars/components/personal', () => {
	const mockTab = () => <div>Mock Tab</div>;
	return mockTab;
});

const tabs = [
	<Summary key={'Summary'} />,
	<Training key={'Training'} />,
	<States key={'States'} />,
	<Personal key={'Personal'} />,
];

describe('pages/dashboard/sections/scholarts/components/mainTabs', () => {
	describe('HTML structure', () => {
		test('should render Profile Tab component', () => {
			const { container } = customRender();
			const root = container.querySelector('.main-tab');

			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
		test('should render the Profile Tabs', () => {
			const { container } = customRender(properties);
			const root = container.querySelector('.main-tab');
			const rootInner = root.innerHTML;

			expect(rootInner).toContain(tabMenu.menuItems[0]);
			expect(rootInner).toContain(tabMenu.menuItems[1]);
			expect(rootInner).toContain(tabMenu.menuItems[2]);
			expect(rootInner).toContain(tabMenu.menuItems[3]);
		});
		test('should select the second tab', () => {
			const { container } = customRender(properties);
			const root = container.querySelector('.main-tab');
			const secondTab = root.querySelectorAll('.menu .item').item(1);

			fireEvent.click(secondTab);
			expect(secondTab.className).toContain('active');
			expect(secondTab.innerHTML).toEqual(tabMenu.menuItems[1]);
		});
	});
});
