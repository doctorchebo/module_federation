import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ApprovalItem from '..';

/**
 * Renders a custom Approval item
 *
 * @param {*} props properties
 * @returns {*} a component to test
 */
function customRender(props) {
	const { container } = render(<ApprovalItem {...props} />);
	return container;
}

describe('pages/dashboard/sections/evaluation/components/ApprovalItem', () => {
	describe('HTML Structure', () => {
		it('Should render with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render an empty content with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.querySelector('.header')).toHaveTextContent('');
		});

		it('Should render a name in content', () => {
			const element = customRender({
				value: {
					userResponse: { firstName: 'testName', lastName: 'testLastname' },
					subjectResponse: {
						name: 'testSubject',
					},
				},
			});
			expect(element).toBeDefined();
			expect(element.querySelector('.header')).toHaveTextContent('testName testLastname');
		});

		it('Should render a checked green icon content', () => {
			const element = customRender({
				value: {
					checked: true,
					userResponse: { firstName: 'testName', lastName: 'testLastname' },
					subjectResponse: {
						name: 'testSubject',
					},
				},
			});
			expect(element).toBeDefined();
			const iconPath = element.querySelector('.approval-check-icon.checked');
			expect(iconPath).toBeDefined();
			expect(iconPath.firstChild.nodeName).toBe('path');
		});
	});

	describe('Functionality', () => {
		it('Should trigger onClick function from parent', () => {
			const onClickMock = jest.fn();
			const element = customRender({
				value: {
					checked: false,
					userResponse: { firstName: 'testName', lastName: 'testLastname' },
					subjectResponse: {
						name: 'testSubject',
					},
				},
				onClickItem: onClickMock,
			});
			fireEvent.click(element.firstChild);
			expect(onClickMock).toHaveBeenCalledTimes(1);
		});
	});
});
