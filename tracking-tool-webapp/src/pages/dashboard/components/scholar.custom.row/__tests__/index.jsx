import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomTableRow from '..';
import { BrowserRouter } from 'react-router-dom';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const scholar = {
	User: 'Vivian Martinez',
	EmailAddress: 'asdf@asdf.com',
	PhoneNumber: '12312312',
	StatusTypeId: 1,
	Version: 'Dev31',
};

const mockAction = {
	changePaginator: jest.fn(),
};

jest.mock('pages/dashboard/sections/scholars/context', () => {
	const state = { isChangePaginator: false };
	return {
		useScholarsContext: () => {
			return [state, mockAction];
		},
	};
});
/**
 * @param {object} properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRender(properties) {
	const { container } = render(<CustomTableRow {...properties} />, {
		container: document.createElement('tbody'),
		wrapper: BrowserRouter,
	});
	const element = container.querySelector('[name="Custom-Row"]');

	return element;
}

/**
 *
 * @param {object}  properties - properties for the component.
 * @returns {object} - rendered component.
 */
function customRenderWithProps(properties) {
	const store = mockStoreConfig({
		scholar: {
			data: [scholar],
		},
	});

	const { container } = render(
		<Provider store={store}>
			<CustomTableRow {...properties} />
		</Provider>,
		{
			container: document.createElement('tbody'),
			wrapper: BrowserRouter,
		}
	);
	const element = container.querySelector('[name="Custom-Row"]');

	return element;
}

describe('components/programVersionTable', () => {
	it('Should render scholar information', () => {
		const element = customRender({ item: scholar, numberOfCells: 6 });
		expect(element).toBeDefined();
		expect(element).toBeInstanceOf(HTMLTableRowElement);
	});
	it('Should expand the scholar item to show additional information', () => {
		const element = customRenderWithProps({
			item: scholar,
			numberOfCells: 6,
		});
		const icon = element.getElementsByClassName('angle right')[0];
		fireEvent.click(icon);
		const expandedRow = document.querySelector('[name="Expanded-Row"]');

		expect(expandedRow).toBeDefined();
	});

	it('Should render data from parameters (rows)', () => {
		const element = customRenderWithProps({
			item: scholar,
			numberOfCells: 6,
		});
		expect(element.querySelector('[name="full-name"]').textContent).toBe(
			`User:${scholar.User}`
		);
		expect(element.querySelector('[name="email"]').textContent).toBe(
			`Email:${scholar.EmailAddress}`
		);
		expect(element.querySelector('[name="phoneNumber"]').textContent).toBe(
			`Phone number:${scholar.PhoneNumber}`
		);
	});
});
