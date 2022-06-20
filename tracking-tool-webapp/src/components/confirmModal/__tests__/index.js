import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ConfirmModal from '..';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

/**
 * @param {boolean} isOpen - is modal open
 * @param {Function} setIsOpen - set is modal open
 * @param  {Function}  accept - accept callback
 * @returns {object} Provider - mock store
 */
function customRender(isOpen, setIsOpen, accept) {
	return render(
		<Provider store={mockStoreConfig({})}>
			<ConfirmModal action={accept} isOpen={isOpen} setIsOpen={setIsOpen} />
		</Provider>
	);
}

describe('components/confirmModal', () => {
	describe('Html structure', () => {
		it('Should render modal', () => {
			const isOpen = true;
			const setIsOpen = jest.fn();
			const { container } = customRender(isOpen, setIsOpen);
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Events', () => {
		it('Cancel button on click', async () => {
			const isOpen = true;
			const setIsOpen = jest.fn();
			let wrapper = customRender(isOpen, setIsOpen);
			const buttonCancel = wrapper.getByText('Cancel');
			fireEvent.click(buttonCancel);
			expect(setIsOpen).toHaveBeenCalledTimes(1);
		});

		it('Confirm button on click', async () => {
			const accept = jest.fn();
			const isOpen = true;
			const setIsOpen = jest.fn();
			let wrapper = customRender(isOpen, setIsOpen, accept);
			const buttonOk = wrapper.getByText('Accept');
			fireEvent.click(buttonOk);
			expect(accept).toHaveBeenCalledTimes(1);
		});
	});
});
