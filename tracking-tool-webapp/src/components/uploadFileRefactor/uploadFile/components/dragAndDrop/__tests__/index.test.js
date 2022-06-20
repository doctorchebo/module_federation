import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import DragAndDrop from '..';
import Dropzone from 'react-dropzone';
import { stringsDnDComponentEnglish } from 'helpers/dragAndDropConstants';

describe('components/dragAndDrop', () => {
	describe('Html structure', () => {
		it('should render correctly', () => {
			const { container } = render(<DragAndDrop text={stringsDnDComponentEnglish} />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('Fire events', () => {
		/**
		 *
		 * @param {object} rerender rerender function
		 * @param {React.Component} ui Dragzzone component
		 */
		async function flushPromises(rerender, ui) {
			await act(() => waitFor(() => rerender(ui)));
		}

		/**
		 *
		 * @param {*} node -
		 * @param {*} type -
		 * @param {*} data -
		 */
		function dispatchEvt(node, type, data) {
			const event = new Event(type, { bubbles: true });
			Object.assign(event, data);
			fireEvent(node, event);
		}

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
		test('invoke onDragEnter when dragenter event occurs', async () => {
			const file = new File([JSON.stringify({ ping: true })], 'ping.json', {
				type: 'application/json',
			});
			const data = mockData([file]);
			const onDragEnter = jest.fn();

			const ui = (
				<Dropzone onDragEnter={onDragEnter}>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps()}>
							<input {...getInputProps()} />
						</div>
					)}
				</Dropzone>
			);
			const { container, rerender } = render(ui);
			const dropzone = container.querySelector('div');

			dispatchEvt(dropzone, 'dragenter', data);
			await flushPromises(rerender, ui);

			expect(onDragEnter).toHaveBeenCalled();
		});
	});
});
