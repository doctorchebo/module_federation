import React from 'react';
import { render } from '@testing-library/react';
import ScholarInformation from '..';

describe('pages/dashboard/components/scholar.information', () => {
	describe('HTML Structure', () => {
		it('Should render with default properties', () => {
			const { container } = render(<ScholarInformation />);
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		it('Should render items with data of the scholar', () => {
			const { container } = render(<ScholarInformation />);
			const items = container.querySelectorAll('.item');
			expect(items).toHaveLength(4);
		});

		it('Should render full name of the scholar', () => {
			const { getByText } = render(<ScholarInformation fullName='Miguel Villanueva' />);
			const fullName = getByText('Miguel Villanueva');
			expect(fullName).toBeDefined();
			expect(fullName).toHaveTextContent('Miguel Villanueva');
		});

		it('Should render the text "Scholar"', () => {
			const { getByText } = render(<ScholarInformation />);
			const text = getByText('Scholar');
			expect(text).toBeDefined();
			expect(text).toHaveTextContent('Scholar');
		});

		it('Should render phone number of the scholar', () => {
			const { getByText } = render(<ScholarInformation phoneNumber='77889956' />);
			const phoneNumber = getByText('77889956');
			expect(phoneNumber).toBeDefined();
			expect(phoneNumber).toHaveTextContent('77889956');
		});

		it('Should render current city of the scholar', () => {
			const { getByText } = render(<ScholarInformation currentCity='Cochabamba' />);
			const currentCity = getByText('Cochabamba');
			expect(currentCity).toBeDefined();
			expect(currentCity).toHaveTextContent('Cochabamba');
		});

		it('Should render an icon', () => {
			const { container } = render(<ScholarInformation />);
			const icon = container.querySelector('.picture');
			expect(icon).toBeDefined();
			expect(icon.firstChild).toBeInstanceOf(HTMLImageElement);
		});
	});
});
