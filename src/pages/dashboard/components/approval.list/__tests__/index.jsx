import { render } from '@testing-library/react';
import React, { Component } from 'react';
import ApprovalList from '..';
/**
 * Render a Approval List componenent.
 *
 * @param {object} props Properties.
 * @returns {Component} a Approval list to test.
 */
function customRender(props) {
	const { container } = render(<ApprovalList {...props} />);
	return container;
}

describe('pages/dashboard/sections/evaluation/components/ApprovalList', () => {
	describe('HTML structure', () => {
		it('Should render an Approval list with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.firstChild).toBeInstanceOf(HTMLElement);
		});

		it('Should render a tittle for list', () => {
			const element = customRender();
			const header = element.querySelector('.approvals-header');
			expect(header).toBeDefined();
			expect(header.textContent).toBe('Approvals');
		});

		it('Should render an warning message of unauthorized check', () => {
			const element = customRender({ showMessage: true });
			const warnMessage = element.querySelector('.yellow.message');
			expect(warnMessage).toBeDefined();
			expect(warnMessage.textContent).toBe('You can check only in your own name');
		});

		it('Should render a list of "approval check" items', () => {
			const mockValue = [
				{
					id: 'id1',
					userResponse: { firstName: 'Test Name', lastName: 'Test LastName' },
					subjectResponse: {
						name: 'testSubject',
					},
					checked: false,
				},
			];

			const element = customRender({ value: mockValue });
			const list = element.querySelector('.list');
			expect(list.firstChild).toBeDefined();

			const listItem = list.querySelector('.approval-item');
			expect(listItem).toBeDefined();
		});
	});
});
