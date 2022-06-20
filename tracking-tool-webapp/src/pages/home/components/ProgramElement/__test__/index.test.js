import React from 'react';
import { render } from '@testing-library/react';
import ProgramElement from '../';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('component/ProgramElement', () => {
	describe('Html structure', () => {
		it('Should render A ProgramElement Component empty', () => {
			const { container } = renderWithRouter(<ProgramElement />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render A ProgramElement Component with img', () => {
			const { container } = renderWithRouter(<ProgramElement img='img.png' />);
			expect(container.getElementsByClassName('program_container_img')[0]).toBeInstanceOf(
				HTMLImageElement
			);
		});

		it('Should render A ProgramElement Component with text', () => {
			const { container } = renderWithRouter(<ProgramElement text='text' />);
			expect(container.getElementsByClassName('program_container_text')[0]).toBeInstanceOf(
				HTMLHeadingElement
			);
		});
	});
});
