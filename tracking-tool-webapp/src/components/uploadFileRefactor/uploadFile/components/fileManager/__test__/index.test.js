import React from 'react';
import { render } from '@testing-library/react';
import FileManager from '..';

const text = { validFilesUI: 'gif' };
const uploadMethods = { onDropAccepted: jest.fn() };
const cardInfo = { validFiles: '.gif' };
const filesInfo = [];
describe('components/uploadFile/fileManager', () => {
	it('Should render the File Manager Component', () => {
		const { container } = render(
			<FileManager
				text={text}
				uploadMethods={uploadMethods}
				cardInfo={cardInfo}
				filesInfo={filesInfo}
			/>
		);
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
