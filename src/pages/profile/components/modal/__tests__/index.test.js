import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileImageModal from '../index';

const handleOpenModalMock = jest.fn();

describe('pages/profile/components/modal', () => {
	describe('Html structure', () => {
		it('Should render modal', () => {
			const { container } = render(
				<ProfileImageModal
					imageSource={{}}
					openModal={false}
					handleOpenModal={handleOpenModalMock}
				/>
			);
			const { firstChild } = container;
			expect(firstChild).toBeInstanceOf(HTMLElement);
			expect(firstChild.childNodes).toHaveLength(1);
		});

		it('should open the modal', async () => {
			const wrapper = render(
				<ProfileImageModal
					imageSource={{}}
					openModal={false}
					handleOpenModal={handleOpenModalMock}
				/>
			);

			const ImageButton = wrapper.getByRole('img');
			fireEvent.click(ImageButton);
			expect(handleOpenModalMock).toBeCalledTimes(1);
		});

		it('should close the modal with Cancel button', async () => {
			const wrapper = render(
				<ProfileImageModal
					imageSource={{}}
					openModal={true}
					handleOpenModal={handleOpenModalMock}
				/>
			);

			const cancelButtonModal = wrapper.getByText('Cancel');
			fireEvent.click(cancelButtonModal);

			expect(handleOpenModalMock).toBeCalledTimes(1);
		});

		it('Should not close modal after clicking on Save button without an image', async () => {
			const wrapper = render(
				<ProfileImageModal
					imageSource={{}}
					openModal={true}
					handleOpenModal={handleOpenModalMock}
				/>
			);

			const saveButtonModal = wrapper.getByText('Save');
			fireEvent.click(saveButtonModal);
			expect(handleOpenModalMock).toBeCalledTimes(0);
		});

		it('should with a image file', async () => {
			const fileTypes = [
				{
					name: 'picture.jpg',
					path: 'picture.jpg',
					size: 13180,
					type: 'image/jpeg',
				},
			];

			const image = {
				name: 'picture.jpg',
				path: 'picture.jpg',
				size: 13180,
				type: 'image/jpeg',
			};

			React.useState = jest
				.fn()
				.mockReturnValueOnce([false, jest.fn()])
				.mockReturnValueOnce([fileTypes, jest.fn()])
				.mockReturnValueOnce([false, jest.fn()])
				.mockReturnValueOnce([image, jest.fn()]);
			const { container } = render(<ProfileImageModal profileData={{}} />);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
		});

		it('should render with Alert because txt is a error file', async () => {
			const fileTypes = [
				{
					name: 'picture.txt',
					path: 'picture.txt',
					size: 13180,
					type: 'text/txt',
				},
			];

			const image = {
				name: 'picture.txt',
				path: 'picture.txt',
				size: 13180,
				type: 'text/txt',
			};

			React.useState = jest
				.fn()
				.mockReturnValueOnce([false, jest.fn()])
				.mockReturnValueOnce([fileTypes, jest.fn()])
				.mockReturnValueOnce([true, jest.fn()])
				.mockReturnValueOnce([image, jest.fn()]);
			const { container } = render(<ProfileImageModal profileData={{}} />);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
		});
	});
});
