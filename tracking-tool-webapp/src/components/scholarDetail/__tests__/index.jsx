import React from 'react';
import { render } from '@testing-library/react';
import ScholarDetail from '..';
import { Provider } from 'react-redux';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const customRender = () =>
	render(
		<Provider store={mockStoreConfig({})}>
			<ScholarDetail />
		</Provider>
	);

describe('components/scholarDetail/components/customPlaceHolder', () => {
	it('Should render by default', () => {
		const { container } = customRender();
		expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
	});
});
