import Profile from '../index';
import React from 'react';
import { useApplication } from 'application/context/AppContext';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

jest.mock('../components/card/index', () => {
	return function CardProfile() {
		return <div className='mock'></div>;
	};
});

jest.mock('application/context/AppContext', () => {
	const state = {};
	const actions = { onProfile: jest.fn() };
	return {
		useApplication() {
			return [state, actions];
		},
	};
});

jest.mock('pages/dashboard/components/breadCrumbs/context/breadcrumbsContext', () => {
	const state = {};
	const actions = {
		onBreadcrumbsLoad: jest.fn(),
	};

	return {
		useBreadcrumbsContext: () => [state, actions],
	};
});

describe('pages/profile', () => {
	describe('Html structure', () => {
		let container;

		beforeEach(() => {
			container = document.createElement('div');
			document.body.appendChild(container);
		});

		afterEach(() => {
			document.body.removeChild(container);
			container = null;
		});
		it('Should execute the onProfile function from actions when the component mounts.', () => {
			act(() => {
				ReactDOM.render(<Profile />, container);
			});
			const [, actions] = useApplication();
			expect(actions.onProfile).toBeCalledTimes(1);
		});
	});
});
