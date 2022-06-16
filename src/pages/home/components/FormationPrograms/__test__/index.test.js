import React from 'react';
import { render } from '@testing-library/react';
import FormationPrograms from '../index';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('component/FormationPrograms', () => {
	describe('Html structure', () => {
		it('Should render A FormationPrograms Component empty', () => {
			const { container } = renderWithRouter(<FormationPrograms programs={[]} />);
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});

	it('Should render A list of progrmas based on the programs property', () => {
		const programs = [
			{ img: 'https://i.ibb.co/FwW1fJJ/New-Project-22.png', text: 'Automation Testing' },
			{ img: 'https://i.ibb.co/JBsdz2r/New-Project-21.png', text: 'Software Developer' },
			{ img: 'https://i.ibb.co/PMR3f13/New-Project-24.png', text: 'Manual Testing' },
		];
		const { container } = render(<FormationPrograms programs={programs} />);
		const programsRendered = container.firstChild.querySelectorAll('.program_container_text');
		const programsTexts = Array.from(programsRendered).map((node) => node.textContent);
		expect(programsTexts).toEqual([
			'Automation Testing',
			'Software Developer',
			'Manual Testing',
		]);
	});
});
