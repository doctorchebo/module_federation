import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ScholarsEvaluationTop from '..';

describe('pages/dashboard/components/scholars.evaluation.top', () => {
	describe('HTML Structure', () => {
		it('Should render with default properties', () => {
			const { container } = render(<ScholarsEvaluationTop />);
			const root = container.querySelector('.evaluation-top');
			expect(root).toBeDefined();
			expect(root).toBeInstanceOf(HTMLDivElement);
		});
	});

	describe('Functionality', () => {
		it('Should the current stage change when other is selected', () => {
			const onChangeMock = jest.fn((value) => value);
			const stages = [
				{ id: 'testId-01', name: 'Backend' },
				{ id: 'testId-02', name: 'Frontend' },
			];
			const { container } = render(
				<ScholarsEvaluationTop onChange={onChangeMock} stages={stages} />
			);
			const optionElement = container.querySelector('div[role="option"]');
			fireEvent.click(optionElement);
			expect(onChangeMock).toHaveBeenCalledTimes(1);
			expect(onChangeMock.mock.results[0].value).toBe('testId-01');
		});
	});
});
