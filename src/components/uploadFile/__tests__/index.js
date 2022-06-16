import React from 'react';
import { act, fireEvent, render, waitFor, screen } from '@testing-library/react';
import UploadFile from '..';

describe('components/uploadFile', () => {
	/**
	 *
	 * @param {object[]} files files
	 * @returns {object} mock data for test
	 */
	function mockData(files) {
		return {
			dataTransfer: {
				files,
				items: files.map((file) => ({
					kind: 'file',
					type: file.type,
					getAsFile: () => file,
				})),
				types: ['Files'],
			},
		};
	}

	/**
	 *
	 * @param {object} rerender rerender function
	 * @param {React.Component} ui Dragzzone component
	 */
	async function flushPromises(rerender, ui) {
		await act(() => waitFor(() => rerender(ui)));
	}

	const sendFiles = jest.fn();

	test('invoke onDragEnter when dragenter event occurs', async () => {
		const mockAction = {
			onImportCandidates: jest.fn(),
			ResetMessages: jest.fn(),
		};
		const ui = (
			<UploadFile
				fileTypes='xls csv'
				title='users'
				validate={(file) => {
					return { isValid: true, messages: ['m1'] };
				}}
				sendFiles={sendFiles}
				actions={mockAction}
			/>
		);
		const { container, rerender } = render(ui);
		const submit = container.querySelector('.upload-btn');

		let blob = new Blob([''], { type: 'xlsx' });
		blob['lastModifiedDate'] = '';
		blob['name'] = 'filename.xlsx';
		let fakeF = blob;

		const data = mockData([fakeF, fakeF]);
		const listNode = screen.getByTestId('dropArea');
		act(() => {
			fireEvent.drop(listNode, data);
		});
		await flushPromises(rerender, ui);
		fireEvent.click(submit);
		await waitFor(() => {
			expect(sendFiles).toHaveBeenCalledTimes(2);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
	test('clicking on the x icon should delete the file', async () => {
		const ui = (
			<UploadFile
				fileTypes='xls csv'
				title='users'
				validate={(file) => {
					return { isValid: true, messages: ['m1'] };
				}}
				sendFiles={sendFiles}
			/>
		);
		const { container, rerender } = render(ui);

		let blob = new Blob([''], { type: 'xlsx' });
		blob['lastModifiedDate'] = '';
		blob['name'] = 'filename.xlsx';
		let fakeF = blob;

		const data = mockData([fakeF]);
		const listNode = screen.getByTestId('dropArea');
		act(() => {
			fireEvent.drop(listNode, data);
		});
		await flushPromises(rerender, ui);
		const closeIcon = container.querySelector('.close.icon');
		fireEvent.click(closeIcon);

		await waitFor(() => {
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
	test('Upload a bad file should trigger error on display', async () => {
		const ui = (
			<UploadFile
				fileTypes='xls csv'
				title='users'
				validate={(file) => {
					return { isValid: false, messages: ['m1'] };
				}}
				sendFiles={sendFiles}
			/>
		);
		const { container, rerender } = render(ui);

		let blob = new Blob([''], { type: 'xls' });
		blob['lastModifiedDate'] = '';
		blob['name'] = 'filename.xls';
		let fakeF = blob;

		const data = mockData([fakeF]);
		const listNode = screen.getByTestId('dropArea');
		act(() => {
			fireEvent.drop(listNode, data);
		});
		await flushPromises(rerender, ui);
		const badIcon = container.querySelector('.red.times.circle.outline.icon.icon_status');
		await waitFor(() => {
			expect(badIcon).toBeDefined();
		});
	});
});
