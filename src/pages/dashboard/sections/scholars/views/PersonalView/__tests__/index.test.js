import React from 'react';
import { render } from '@testing-library/react';
import PersonalView from '..';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const mockState = {
	data: {
		person: {
			name: 'John',
		},
	},
	loading: false,
	success: false,
};

const mockAction = {
	OnGetScholarById: jest.fn(),
	onScholarUpdate: jest.fn(),
};

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: () => {
			return [mockState, mockAction];
		},
	};
});

const renderComponent = () => {
	return render(
		<Provider store={mockStoreConfig({})}>
			<BrowserRouter>
				<PersonalView />
			</BrowserRouter>
		</Provider>
	);
};

describe('pages/scholars/views/PersonalView', () => {
	beforeEach(() => {
		mockState.loading = false;
		mockState.success = false;
	});
	it('Should load when loading status is true', () => {
		mockState.loading = true;
		const { container } = renderComponent();
		expect(container).toHaveTextContent('Loading...');
	});
	it('Should render the details when success status is true', () => {
		mockState.success = true;
		const { container } = renderComponent();
		const header = container.querySelector('.container-personal__header');
		const main = container.querySelector('.container-personal__main');
		expect(container).toBeInstanceOf(HTMLDivElement);
		expect(header).toBeInstanceOf(HTMLElement);
		expect(main).toBeInstanceOf(HTMLDivElement);
	});
	it('Should display empty content image', () => {
		const { container } = renderComponent();
		const image = container.querySelector('img');
		expect(image).toBeInstanceOf(HTMLImageElement);
	});
});
