/* eslint-disable jest/no-commented-out-tests */
import React from 'react';
import ProfilePicture from '..';
import { render } from '@testing-library/react';

const mockState = {
	userImage: { id: '16d3d984-672d-4e31-90e1-4206375a4b9b', providerImageKey: 'image' },
	loading: false,
};

const mockAction = {
	onGetUserImageById: jest.fn(),
};
jest.mock('pages/profile/context', () => {
	return {
		useProfileContext: () => {
			return [mockState, mockAction];
		},
	};
});

describe('pages/profile/components/profilePicture', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = render(<ProfilePicture />);
	});

	it('Should return a Image', () => {
		const { container } = wrapper;

		expect(container).toBeDefined();
		expect(container.innerHTML).toContain('ui mini circular spaced image');
	});

	it('Should return a src image', () => {
		const { getByAltText } = wrapper;

		const image = getByAltText('userImage');

		expect(image.src).toContain(mockState.userImage.providerImageKey);
	});

	it('Should match with snapshot', () => {
		const { asFragment } = wrapper;
		expect(asFragment()).toMatchSnapshot();
	});
});
