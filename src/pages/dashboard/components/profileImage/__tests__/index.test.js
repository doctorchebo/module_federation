import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ProfileImage from '..';

/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	return render(<ProfileImage {...properties} />);
}

describe('src/pages/dashboard/components/backgroundImage', () => {
	it('Should render a image whit a border green', () => {
		const mockImageData = {
			color: 'green',
			size: 'mini',
			src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
		};
		const { container } = customRender({ ...mockImageData });
		const imgElement = container.querySelector('img');
		expect(imgElement).toBeDefined();
		expect(imgElement).toHaveClass('image');
		expect(imgElement).toHaveClass('ui mini circular spaced image', { exact: true });
		expect(imgElement).toHaveStyle(
			'box-shadow: 0px 0px 0px 0.2rem white, 0px 0px 0px 0.42rem green'
		);
	});
	it('Should render a image whit a border Empty', () => {
		const mockImageDataWithColorEmpty = {
			color: '',
			src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
		};
		const { container } = customRender({ ...mockImageDataWithColorEmpty });
		const imgElement = container.querySelector('img');
		expect(imgElement).toBeDefined();
		expect(imgElement).toHaveClass('image');
		expect(imgElement).toHaveClass('ui mini circular spaced image', { exact: true });
		expect(imgElement).toHaveStyle(
			'box-shadow: 0px 0px 0px 0.2rem white, 0px 0px 0px 0.42rem white'
		);
	});

	it('Should render a image whitout a border', () => {
		const mockImageDataWithoutColor = {
			src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
		};
		const { container } = customRender({ ...mockImageDataWithoutColor });
		const imgElement = container.querySelector('img');
		expect(imgElement).toBeDefined();
		expect(imgElement).toHaveClass('image');
		expect(imgElement).toHaveClass('ui mini circular spaced image', { exact: true });
		expect(imgElement).toHaveStyle(
			'box-shadow: 0px 0px 0px 0.2rem white, 0px 0px 0px 0.42rem white'
		);
	});
});
