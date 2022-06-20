import React from 'react';
import { render } from '@testing-library/react';
import States from '../index';
import { StatusDataProvider } from 'pages/dashboard/views/scholar.status.history/context';
import mockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStoreConfig = mockStore(middlewares);

const mockState = {
	data: {
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Marcos Armendia',
		},
	},
	programVersionName: 'Dev31',
};
const mockScholarActions = {
	OnGetScholarById: jest.fn(),
};
const mockApplicationState = { sidebarHistory: [] };
const mockApplicationActions = { onSidebarAddView: jest.fn() };

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: () => {
			return [mockState, mockScholarActions];
		},
	};
});

jest.mock('application/context/AppContext', () => {
	return {
		useApplication: () => {
			return [mockApplicationState, mockApplicationActions];
		},
	};
});

const customRender = () => {
	return render(
		<Provider store={mockStoreConfig({})}>
			<StatusDataProvider>
				<States />
			</StatusDataProvider>
		</Provider>
	);
};
describe('pages/dashboard/sections/scholars/components/states', () => {
	describe('Html structure', () => {
		test('Should render container by default', () => {
			const { container } = customRender();
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});

		test('Should match with snapshot', () => {
			const { asFragment } = customRender();
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
