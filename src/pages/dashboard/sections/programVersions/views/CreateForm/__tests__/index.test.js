import React from 'react';
import CreateFormProgramVersion from '../index';
import { render } from '@testing-library/react';

const mockProgramVersionState = { stages: [], trainers: [] };

const mockProgramVersionAction = {
	onGetTrainers: jest.fn(),
	onGetStages: jest.fn(),
	OnPutProgramVersion: jest.fn(),
};

jest.mock('../../../context/index', () => {
	return {
		useProgramVersionsContext: () => {
			return [mockProgramVersionState, mockProgramVersionAction];
		},
	};
});

/**
 * @param {props} props Properties.
 * @returns {HTMLElement} Returns an Html Element.
 */
function customRender(props) {
	const { container } = render(<CreateFormProgramVersion {...props} />);
	return container;
}

describe('pages/dashboard/sections/scholars/components/statusForm', () => {
	describe('HTML structure', () => {
		test('Should render with default properties', () => {
			const root = customRender({
				item: {
					id: 'id program version',
					version: 'program version test',
				},
			});

			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
			expect(root.firstChild.classList.contains('program-version-header')).toBeTruthy();
		});
	});
});
