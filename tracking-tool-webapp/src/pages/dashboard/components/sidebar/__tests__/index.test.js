/* eslint-disable max-len */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sidebar from '../index';
import { MemoryRouter } from 'react-router-dom';

const mockDashboardState = { importing: true };
const setShowMock = jest.fn((payload) => {
	return payload;
});
const mockDashboardAction = { onImporting: (payload) => setShowMock(payload), onDimmed: jest.fn() };

jest.mock('pages/dashboard/context/Context', () => {
	return {
		useDashBoardContext: () => {
			return [mockDashboardState, mockDashboardAction];
		},
	};
});

jest.mock(
	'components/uploadFile',
	() =>
		function UploadFile() {
			return <button className='ui compact button back-btn' onClick={() => {}}></button>;
		}
);

const mockState = { title: '', fileTypes: '', reports: null, loading: false };
const mockAction = {
	onRemoveReports: jest.fn(),
	onImportFiles: jest.fn(),
};

describe('pages/dashboard/components/sidebar', () => {
	describe('trigger actions', () => {
		it('has to close the sidebar when clicking on back to users button', () => {
			const { container } = render(
				<Sidebar actions={mockAction} state={mockState} validateFunction={() => {}} />,
				{
					wrapper: MemoryRouter,
				}
			);
			const button = container.querySelector('.ui.compact.button.back-btn');
			const sidebar = container.querySelector(
				'.ui.vertical.labeled.icon.ui.overlay.right.very.wide.visible.sidebar.sidebar.menu'
			);
			const invisibleSidebar = container.querySelector(
				'.ui.vertical.labeled.icon.ui overlay.right.very.wide.animating.sidebar.sidebar.menu'
			);
			expect(sidebar).toBeDefined();
			expect(invisibleSidebar).toBeNull();
			fireEvent.click(button);
			expect(invisibleSidebar).toBeDefined();
		});
	});
});
