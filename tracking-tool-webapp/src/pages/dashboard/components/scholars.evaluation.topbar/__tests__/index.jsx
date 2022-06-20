import React from 'react';
import { render } from '@testing-library/react';
import EvaluationTopBar from '../';

describe('pages/dashboard/components/scholars.evaluation.topbar', () => {
	describe('Html structure', () => {
		test('Should render with default properties', () => {
			const { container } = render(<EvaluationTopBar />);
			expect(container).toBeInstanceOf(HTMLElement);
		});

		test('Should render with custom properties', () => {
			const customProperties = {
				value: {
					name: 'test',
					version: 'test',
					evaluation: 'test',
					finished: 'test',
					reload: 'test',
					finish: 'test',
				},
				readOnly: true,
				isClosed: true,
				showFinishButton: true,
				onFinish: () => {},
				onReload: () => {},
			};
			const { container } = render(<EvaluationTopBar {...customProperties} />);
			expect(container).toBeInstanceOf(HTMLElement);
		});
	});
});
