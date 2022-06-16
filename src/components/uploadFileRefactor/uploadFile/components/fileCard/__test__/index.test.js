import React from 'react';
import { render } from '@testing-library/react';
import FileCard from '..';

const file = { fileObject: { errorList: [], src: { type: 'pdf/aplication', name: 'test.pdf' } } };
const cardInfo = { validMaximunSize: 25 };
const fileMethods = { handleAddFileError: jest.fn(), handleValidateFileState: jest.fn() };

describe('components/uploadFile/fileManager/fileList/fileCard', () => {
	it('Should render the fileCard Component', () => {
		const { container } = render(
			<FileCard file={file} fileMethods={fileMethods} cardInfo={cardInfo} />
		);
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
