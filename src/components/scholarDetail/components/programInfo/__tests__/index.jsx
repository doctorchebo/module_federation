import React from 'react';
import { render } from '@testing-library/react';
import ProgramInfo from '..';
const props = {
	title: 'Programs',
	programVersionName: 'No Active Program',
};
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<ProgramInfo {...properties} />);

	return container;
}
describe('components/scholarDetail/components/programInfo', () => {
	it('Should render by default', () => {
		const container = customRender(props);
		expect(container).toBeDefined();
	});
	it('Should display properties', () => {
		const container = customRender(props);
		const title = container.querySelector('[name="Title"]');
		const programVersionName = container.querySelector('[name="ProgramVersion-Name"]');

		expect(title.textContent).toBe('Programs');
		expect(programVersionName.textContent).toBe('No Active Program');
	});
});
