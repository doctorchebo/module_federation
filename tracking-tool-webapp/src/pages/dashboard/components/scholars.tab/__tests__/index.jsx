import { render } from '@testing-library/react';
import React from 'react';
import ScholarsTab from '..';
import locale from 'pages/dashboard/locale/en.json';
import '@testing-library/jest-dom/extend-expect';

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

const [eventsLabel, statusLabel] = locale.scholars.tab.menuItems;

jest.mock('pages/dashboard/components/eventsManager', () => () => 'EventManager');

/**
 * Renders the ScholarsTab component
 *
 * @param {object} properties Properties component
 * @returns {React.Component} ScholarsTab component
 */
function customRender(properties) {
	return render(<ScholarsTab {...properties} />);
}

describe('pages/dashboard/components/scholars.tab', () => {
	describe('HTML structure', () => {
		test('should render scholar tab component', () => {
			const { container } = customRender();
			const root = container.querySelector('.scholars.tab');

			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
		test('should render one tab', () => {
			const { container } = customRender(properties);
			const root = container.querySelector('.scholars.tab');

			expect(root).toHaveTextContent(eventsLabel);
		});
		test('should render only events tab', () => {
			const { container } = customRender({ ...properties, displayNewView: true });
			const root = container.querySelector('.scholars.tab');

			expect(root).toHaveTextContent(eventsLabel);
			expect(root).not.toHaveTextContent(statusLabel);
		});
	});
});
