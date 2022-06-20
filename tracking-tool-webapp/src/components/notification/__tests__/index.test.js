import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notification from '../';
import List from '../list';
import Item from '../item';

describe('components/notification', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<Notification />);
			const root = container.querySelector('.notification');
			expect(root).toBeInstanceOf(HTMLElement);
		});

		test('Should render with custom icon', () => {
			const { container } = render(<Notification icon='star' />);
			const numberOfNotifications = container.querySelector('i');
			expect(numberOfNotifications.classList).toContain('star');
		});

		test('Should render without badge when notifications were view', () => {
			const mockValue = { viewed: true, list: [] };
			const { container } = render(<Notification value={mockValue} />);
			const numberOfNotifications = container.querySelector('.badge');
			expect(numberOfNotifications).toBeNull();
		});

		test('Should render with badge when value is more than zero', () => {
			const mockValue = {
				list: [{ isRead: false }, { isRead: false }, { isRead: false }],
				viewed: false,
			};
			const { container } = render(<Notification value={mockValue} />);
			const numberOfNotifications = container.querySelector('span.label');
			expect(numberOfNotifications).toHaveTextContent('3');
		});

		test('Should render with badge 9+ when value is more than nine', () => {
			const mockValue = {
				viewed: false,
				list: [
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
					{ isRead: false },
				],
			};
			const { container } = render(<Notification value={mockValue} />);
			const numberOfNotifications = container.querySelector('span.label');
			expect(numberOfNotifications).toHaveTextContent('9+');
		});
	});
});

describe('components/notification/list', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<List />);
			const root = container.querySelector('.list');
			expect(root).toBeInstanceOf(HTMLElement);
		});

		test('Should render the same number of listItem that length of value', () => {
			const mockValue = [{}, {}, {}];
			const { container } = render(<List value={mockValue} />);
			const listItemElements = container.querySelector('.list');
			expect(listItemElements).toBeInstanceOf(HTMLElement);
			expect(listItemElements.childElementCount).toBe(3);
		});
	});
});

describe('components/notification/item', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<Item />);
			const root = container.querySelector('.notification-item');
			expect(root).toBeInstanceOf(HTMLElement);
		});

		test('Should render with custom listItem title and description', () => {
			const customTitle = 'Custom list item title';
			const customDescription = 'Custom list item description';
			const { container } = render(
				<Item title={customTitle} description={customDescription} />
			);
			const titleElement = container.querySelector('.content .header');
			const descriptionElement = container.querySelector('.content .description');
			expect(titleElement).toHaveTextContent('Custom list item title');
			expect(descriptionElement).toHaveTextContent('Custom list item description');
		});

		test('Should render with calendar icon when type is event', () => {
			const mockType = 'event';
			const { container } = render(<Item type={mockType} />);
			const iconElement = container.querySelector('.message i');
			expect(iconElement).toHaveClass('calendar outline icon');
		});

		test('Should render with color teal when isRead is false', () => {
			const mockIsRead = false;
			const { container } = render(<Item isRead={mockIsRead} />);
			const itemListElement = container.firstElementChild;
			expect(itemListElement).toHaveClass('teal');
		});

		test('Should render with correct format of dateTime with minutes of difference', () => {
			const now = new Date();
			const mockDate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours(),
				now.getMinutes() - 2
			);
			const { container } = render(<Item createdAt={mockDate} />);
			const dateTimeElement = container.querySelector('.content .date-time');
			expect(dateTimeElement).toHaveTextContent('2 minutes ago');
		});

		test('Should render with correct format of dateTime with hours of difference', () => {
			const now = new Date();
			const mockDate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				now.getHours() - 2,
				now.getMinutes()
			);
			const { container } = render(<Item createdAt={mockDate} />);
			const dateTimeElement = container.querySelector('.content .date-time');
			expect(dateTimeElement).toHaveTextContent('2 hours ago');
		});

		test('Should render with correct dateTime with more than 7 days of difference', () => {
			const mockDate = new Date(2021, 4, 14, 18, 19);
			const { container } = render(<Item createdAt={mockDate} />);
			const dateTimeElement = container.querySelector('.content .date-time');
			expect(dateTimeElement).toHaveTextContent('Friday, May 14 2021, 6:19 pm');
		});
	});
});
