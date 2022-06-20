import React from 'react';
import { render } from '@testing-library/react';
import UploadFile from '..';
describe('components/uploadFile', () => {
	it('Should render the Upload File Component', () => {
		const { container } = render(<UploadFile />);
		expect(container).toBeInstanceOf(HTMLDivElement);
	});
});
