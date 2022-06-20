import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CommentBox from '..';

const valueTest = { title: 'test title', content: 'test content' };

describe('pages/dashboard/components/scholar.comment.box', () => {
	describe('HTML Structure', () => {
		test('Should render a default comment box', () => {
			const { container } = render(<CommentBox value={valueTest} />);
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		test('Should render a comment box with title content in readonly mode by default', () => {
			const { container } = render(<CommentBox value={valueTest} />);
			expect(container).toBeDefined();
			expect(container.querySelector('.header').textContent).toBe('test title');
			expect(container.querySelector('.content').textContent).toBe('test content');
		});

		test('Should render a comment box with title content in readonly mode especified', () => {
			const { container } = render(<CommentBox value={valueTest} readonly={true} />);
			expect(container).toBeDefined();
			expect(container.querySelector('.header').textContent).toBe('test title');
			expect(container.querySelector('.content').textContent).toBe('test content');
		});

		test('Should render a comment box with title and content in edit mode especified', () => {
			const { container } = render(<CommentBox value={valueTest} readonly={false} />);
			expect(container).toBeDefined();
			expect(container.querySelector('.header').textContent).toBe('test title');
			expect(container.querySelector('.content').textContent).toBe('test content');
		});

		test('Should render an input (Text area) element in edit mode especified', () => {
			const { container } = render(<CommentBox readonly={false} value={valueTest} />);
			fireEvent.click(container.querySelector('.content p'));
			expect(container.querySelector('.content .field.input')).toBeDefined();
			expect(container.querySelector('.content .field.input').firstChild).toBeInstanceOf(
				HTMLTextAreaElement
			);
		});

		test('Should render check icon in edit mode especified', () => {
			const { container } = render(<CommentBox readonly={false} value={valueTest} />);
			fireEvent.click(container.querySelector('.content p'));
			expect(container.querySelector('.icon.check')).toBeDefined();
			expect(container.querySelector('.icon.check').firstChild.nodeName).toBe('path');
		});

		test('Should not render check icon in readonly mode especified', () => {
			const { container } = render(<CommentBox readonly={true} value={valueTest} />);
			expect(container.querySelector('.icon.check')).toBeNull();
		});
	});

	describe('Event handlers', () => {
		test('Should call the onChange action when change the value of input', () => {
			const onChangeMock = jest.fn((value) => value);
			const { container } = render(
				<CommentBox readonly={false} value={valueTest} onChange={onChangeMock} />
			);
			fireEvent.click(container.querySelector('.content p'));
			const textArea = container.querySelector('.content .field.input');
			fireEvent.change(textArea.firstChild, { target: { value: 'Something' } });
			expect(onChangeMock).toHaveBeenCalledTimes(1);
			expect(onChangeMock.mock.results[0].value).toBe('Something');
		});
	});

	describe('Functionality', () => {
		test('Should change to edit mode when click on Content area in readonly mode', () => {
			const { container } = render(<CommentBox readonly={false} value={valueTest} />);
			fireEvent.click(container.querySelector('.content p'));
			expect(container.querySelector('.icon.check').firstChild.nodeName).toBe('path');
			expect(container.querySelector('.content .field.input').firstChild).toBeInstanceOf(
				HTMLTextAreaElement
			);
		});

		test('Should change to readonly mode when click on Check icon in edit mode', () => {
			const { container } = render(<CommentBox readonly={false} value={valueTest} />);
			fireEvent.click(container.querySelector('.content p'));
			fireEvent.click(container.querySelector('.icon.check'));
			expect(container.querySelector('.icon.check')).toBeNull();
		});
	});
});
