import React from 'react';
import { render } from '@testing-library/react';
import PersonInfo from '..';
const props = {
	fullName: 'Osmar Ugarte',
	phoneNumber: '666 - 666666',
	currentCity: 'Cochabamba',
	imageProfile: 'imageURL.com',
};
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<PersonInfo {...properties} />);
	const element = container.querySelector('[name="Person-Info"]');

	return element;
}
describe('components/scholarDetail/components/personInfo', () => {
	it('Should render by default', () => {
		const container = customRender(props);
		expect(container).toBeDefined();
	});
	it('Should display properties', () => {
		const container = customRender(props);
		const image = container.querySelector('[name="Profile-Image"]');
		const fullName = container.querySelector('[name="Full-Name"]');
		const phoneNumber = container.querySelector('[name="Phone-Number"]');
		const currentCity = container.querySelector('[name="Current-City"]');

		expect(fullName.textContent).toBe('Osmar Ugarte');
		expect(phoneNumber.textContent).toBe('666 - 666666');
		expect(currentCity.textContent).toBe('Cochabamba');
		expect(image.getAttribute('src')).toBe('imageURL.com');
	});
});
