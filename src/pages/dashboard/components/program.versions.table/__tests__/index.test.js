import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProgramVersionsTable from '..';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const listProgramVersions = [
	{
		id: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		name: 'Dev31',
		startDate: '2021-01-15T00:00:00.0000000Z',
		endDate: '2021-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
		},
		status: 'InProgress',
	},
	{
		id: '2ce69f92-1d83-24d5-b264-1e17f2abd322',
		name: 'Research31',
		startDate: '2021-01-15T00:00:00.0000000Z',
		endDate: '2021-09-15T00:00:00.0000000Z',
		coordinator: {
			id: '3fffc534-1d83-44d5-b264-1e17feabd322',
			firstName: 'Alejandro',
			lastName: 'Ruiz',
			email: 'alejandro.ruiz@fundacion-jala.org',
			currentCity: null,
			phoneNumber: null,
		},
		status: 'InProgress',
	},
];

const customRender = (listProgramVersions) => {
	return render(
		<Provider
			store={mockStoreConfig({
				programVersions: {
					list: listProgramVersions,
				},
			})}
		>
			<BrowserRouter>
				<ProgramVersionsTable value={listProgramVersions} />
			</BrowserRouter>
		</Provider>
	);
};

describe('components/programVersionTable', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = customRender(listProgramVersions);
	});

	it('Should render by default', () => {
		const { container } = wrapper;
		expect(container.firstChild).toBeInstanceOf(HTMLTableElement);
	});
});
