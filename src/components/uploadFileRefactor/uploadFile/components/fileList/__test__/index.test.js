import React from 'react';
import { render } from '@testing-library/react';
import FileList from '..';

const filesInfo = [];
describe('components/uploadFile/fileManager/fileList', () => {
	it('Should render the file list Component', () => {
		const { container } = render(<FileList filesInfo={filesInfo} />);
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
