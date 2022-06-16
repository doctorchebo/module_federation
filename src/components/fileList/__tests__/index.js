import React from 'react';
import { render } from '@testing-library/react';
import FileList from '..';

describe('components/fileList', () => {
	describe('Html structure', () => {
		it('should render  fileList component correctly when there is no files', () => {
			const { container } = render(<FileList files={[]} />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('should render  fileList component correctly when there are files', () => {
			const files = [
				{ fileName: 'file1.xls', status: 'loading', progress: '30' },
				{ fileName: 'file2.xls', status: 'loading', progress: '50' },
				{ fileName: 'file3.xls', status: 'loading', progress: '50' },
				{ fileName: 'file4.xls', status: 'loading', progress: '50' },
			];
			const { container } = render(<FileList files={files} />);
			const FilesRendered = container.querySelectorAll('.info_content');
			const programsTexts = Array.from(FilesRendered).map((node) => node.textContent);
			expect(programsTexts).toEqual([
				'file1.xls30%',
				'file2.xls50%',
				'file3.xls50%',
				'file4.xls50%',
			]);
		});
	});
});
