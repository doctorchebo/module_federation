import React from 'react';
import { render } from '@testing-library/react';
import CardProfile from '../../modal/index';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { useProfileContext } from '../../../context/index';

jest.mock('../../../context/index', () => {
	const state = {};
	const actions = { onGetUserImageById: jest.fn() };
	return {
		useProfileContext() {
			return [state, actions];
		},
	};
});
describe('pages/profile/components/card', () => {
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
				ReactDOM.render(<CardProfile />, container);
			});
			const [, actions] = useProfileContext();
			expect(actions.onGetUserImageById).toBeCalledTimes(0);
		});
		it('Should render card', () => {
			const { container } = render(<CardProfile profileData={{}} actions={{}} />);
			expect(container.firstChild).toBeInstanceOf(HTMLElement);
			expect(container.firstChild.childNodes).toHaveLength(1);
		});
	});
});
