import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import RichTextEditor from '../index';

const fieldSettings = {
	title: '',
	description: '',
	placeholder: '',
	label: '',
	onChange: jest.fn(),
};

/**
 * @param {props} props Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(props) {
	const { container } = render(<RichTextEditor {...props} />);
	return container;
}

describe('pages/dashboard/components/richTextEditor', () => {
	describe('Press buttons in the Rich Text', () => {
		const setup = () => {
			const root = customRender({ ...fieldSettings });
			return root;
		};
		test('Check button Bold in the component', () => {
			const container = setup();
			let buttonBold = container.querySelector('div[title="Bold"]');
			expect(buttonBold).not.toHaveClass('rdw-option-active');
			fireEvent.click(buttonBold);
			buttonBold = container.querySelector('div[title="Bold"]');
			expect(buttonBold).toHaveClass('rdw-option-active');
		});
		test('Check button Italic in the component', () => {
			const container = setup();
			let btnItalic = container.querySelector('div[title="Italic"]');
			expect(btnItalic).not.toHaveClass('rdw-option-active');
			fireEvent.click(btnItalic);
			btnItalic = container.querySelector('div[title="Italic"]');
			expect(btnItalic).toHaveClass('rdw-option-active');
		});
		test('Check button Underline in the component', () => {
			const container = setup();
			let btnUnderline = container.querySelector('div[title="Underline"]');
			expect(btnUnderline).not.toHaveClass('rdw-option-active');
			fireEvent.click(btnUnderline);
			btnUnderline = container.querySelector('div[title="Underline"]');
			expect(btnUnderline).toHaveClass('rdw-option-active');
		});
		test('Check button Strikethrough in the component', () => {
			const container = setup();
			let btnStrikethrough = container.querySelector('div[title="Strikethrough"]');
			expect(btnStrikethrough).not.toHaveClass('rdw-option-active');
			fireEvent.click(btnStrikethrough);
			btnStrikethrough = container.querySelector('div[title="Strikethrough"]');
			expect(btnStrikethrough).toHaveClass('rdw-option-active');
		});
		test('Check button Unordered in the component', () => {
			const container = setup();
			let btnUnordered = container.querySelector('div[title="Unordered"]');
			expect(btnUnordered).not.toHaveClass('rdw-option-active');
			fireEvent.click(btnUnordered);
			btnUnordered = container.querySelector('div[title="Unordered"]');
			expect(btnUnordered).toHaveClass('rdw-option-active');
		});
		test('Check button Ordered in the component', () => {
			const container = setup();
			let btnOrdered = container.querySelector('div[title="Ordered"]');
			expect(btnOrdered).not.toHaveClass('rdw-option-active');
			fireEvent.click(btnOrdered);
			btnOrdered = container.querySelector('div[title="Ordered"]');
			expect(btnOrdered).toHaveClass('rdw-option-active');
		});
		test('Check button Color Picker in the component', () => {
			const container = setup();
			let btnColorPicker = container.querySelector('.rdw-colorpicker-modal');
			expect(btnColorPicker).toBe(null);
			fireEvent.click(container.querySelector('div[title="Color Picker"]'));
			btnColorPicker = container.querySelector('.rdw-colorpicker-modal');
			expect(btnColorPicker).toBeDefined();
		});
		test('Check add Link in the component', () => {
			const container = setup();
			let buttonLinkModal = container.querySelector('.rdw-link-modal');
			expect(buttonLinkModal).toBe(null);
			fireEvent.click(container.querySelector('.rdw-link-wrapper'));
			buttonLinkModal = container.querySelector('.rdw-link-modal');
			expect(buttonLinkModal).toBeDefined();
		});
	});
});
