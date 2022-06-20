import { render } from '@testing-library/react';
import React from 'react';
import Training from '..';
import Router from 'react-router';

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: () => {
			const state = {
				trainnings: [],
			};
			const actions = {
				onGetTrainingsByScholar: jest.fn(),
			};
			return [state, actions];
		},
	};
});

jest.mock('react-router-dom', () => {
	return {
		useParams: () => {
			return {
				id: '123',
			};
		},
	};
});

/**
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender() {
	const { container } = render(<Training />);
	return container;
}

const mockState = {
	data: {
		id: '11221111-1d83-44d5-b264-1e17feabd322',
	},
	trainnings: [],
};

const mockAction = {
	onGetTrainingsByScholar: jest.fn(),
};

jest.mock('components/scholarDetail/context/context', () => {
	return {
		useScholarDetailContext: () => {
			return [mockState, mockAction];
		},
	};
});

jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockState.data.id });
describe('components/personal', () => {
	describe('Html structure', () => {
		it('Should render training tab', () => {
			const container = customRender();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
});
