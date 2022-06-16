import React from 'react';
import { render } from '@testing-library/react';
import FileProgressBar from '..';

describe('components/uploadFile/fileManager/fileList/fileCard/fileProgressBar', () => {
	it('Should render the progress bar Component', () => {
		const { container } = render(<FileProgressBar />);
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
