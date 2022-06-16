import { render } from '@testing-library/react';
import React from 'react';
import Personal from '..';

const mockAction = { scholarActions: jest.fn() };
const mockData = {
	fullName: 'Virgil Van Dijk',
	university: 'Tomas Frias',
	career: 'Sistemas',
	academicDegree: '8th Semester',
	currentCity: 'Potosi',
	id: 'efcb6bdc-a7f1-455e-9108-3a81eca3073c',
	extension: 'potosi',
	personalEmail: 'sofia.perez@gmail.com',
};

/**
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender() {
	const { container } = render(<Personal scholarActions={mockAction} personalData={mockData} />);
	return container;
}

describe('components/personal', () => {
	describe('Html structure', () => {
		it('Should render personal tab', () => {
			const container = customRender();
			expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('render properly data and icons', () => {
		it('Should render all content pass from props properly', () => {
			const { getByText } = render(
				<Personal scholarActions={mockAction} personalData={mockData} />
			);
			const fullName = getByText(mockData.fullName);
			const university = getByText(mockData.university);
			const career = getByText(mockData.career);
			const academicDegree = getByText(mockData.academicDegree);
			const currentCity = getByText(mockData.currentCity);
			const id = getByText(`${mockData.id}PT`);
			const personalEmail = getByText(`${mockData.personalEmail}`);
			expect(fullName).toBeDefined();
			expect(university).toBeDefined();
			expect(career).toBeDefined();
			expect(academicDegree).toBeDefined();
			expect(currentCity).toBeDefined();
			expect(id).toBeDefined();
			expect(personalEmail).toBeDefined();
		});
		it('Should render all icons properly', () => {
			const container = customRender();
			const id = container.querySelector('[name="id card"]');
			const university = container.querySelector('[name="university"]');
			const graduation = container.querySelector('[name="graduation"]');
			const city = container.querySelector('[name="map pin"]');
			const email = container.querySelector('[name="mail"]');

			expect(id).toBeDefined();
			expect(university).toBeDefined();
			expect(graduation).toBeDefined();
			expect(city).toBeDefined();
			expect(email).toBeDefined();
		});
	});
	describe('non-complete information', () => {
		it('Should the information be null', () => {
			const mockdata2 = {
				fullName: '',
				university: '',
				career: '',
				academicDegree: '',
				currentCity: '',
				id: '',
				extension: '',
				personalEmail: '',
			};
			const { container } = render(
				<Personal scholarActions={mockAction} personalData={mockdata2} />
			);
			const fullName = container.querySelector('.container-personal__name > span');
			expect(fullName.innerHTML).toEqual('');
			const informations = [
				...document.querySelectorAll('.container-personal__following > div > span'),
			];
			informations.map((information) => {
				const content = information.innerHTML;
				expect(content).toEqual('');
			});
		});
	});
});
