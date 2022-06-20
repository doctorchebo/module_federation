import React from 'react';
import { render } from '@testing-library/react';
import ScholarDuration from '..';

const props = {
	enrollDate: '12/20/2012',
	endDate: '2023-03-16T00:00:00.0000000Z',
	duration: 'Duration',
	start: 'By recruitment',
	now: 'Until Now',
};
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<ScholarDuration {...properties} />);
	return container;
}
describe('components/scholarDetail/components/scholarDuration', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = customRender(props);
	});

	it('Should render by default', () => {
		expect(wrapper).toBeDefined();
	});

	it('Should display properties', () => {
		const enrollDate = wrapper.querySelector('[name="Enroll-Date"]');
		const duration = wrapper.querySelector('[name="Title"]');
		const start = wrapper.querySelector('[name="Enroll-Description"]');

		expect(enrollDate.textContent).toBe('Dec 20, 2012');
		expect(duration.textContent).toBe('Duration');
		expect(start.textContent).toBe('By recruitment');
	});

	test('Should display date difference when there is an end date', () => {
		const endDateContainer = wrapper.querySelector('[name="end-date"]');
		const todayContainer = wrapper.querySelector('[name="today-title"]');

		expect(endDateContainer).toBeDefined();
		expect(todayContainer).toBeNull();
		expect(endDateContainer.textContent).toBe('Mar 16, 2023');
	});

	test('Should display the end date description of the scholar', () => {
		const endDateDescriptionContainer = wrapper.querySelector('[name="end-date-description"]');
		const todayContainer = wrapper.querySelector('[name="today-title"]');

		expect(endDateDescriptionContainer).toBeDefined();
		expect(todayContainer).toBeNull();
		expect(endDateDescriptionContainer.textContent).toBe('10 years, 3 months');
	});

	test('Should display the text until now when there is no end date', () => {
		const wrapper = customRender({ ...props, endDate: null });
		const todayContainer = wrapper.querySelector('[name="today-title"]');

		expect(todayContainer).toBeDefined();
		expect(todayContainer.textContent).toBe('Until Now');
	});
});
