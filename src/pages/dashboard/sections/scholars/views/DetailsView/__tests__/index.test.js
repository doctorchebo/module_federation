import React from 'react';
import { render } from '@testing-library/react';
import DetailsView from '..';
import Router from 'react-router';
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
	programVersion: 'dev31',
	success: true,
};

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

jest.mock('../../../components/details', () => {
	const DetailsMock = () => <div>DetailsMock</div>;
	return DetailsMock;
});

const mockAction = { OnGetScholarById: jest.fn() };

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: () => {
			return [mockState, mockAction];
		},
	};
});

describe('pages/scholars/views/DetailView', () => {
	it('Should render scholar details view', () => {
		jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' });
		const element = render(
			<Provider store={mockStoreConfig({})}>
				<DetailsView />
			</Provider>
		);
		expect(element).toBeDefined();
	});
});
