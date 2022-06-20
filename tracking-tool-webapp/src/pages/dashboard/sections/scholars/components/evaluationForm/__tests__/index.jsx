import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EvaluationForm from '..';

const questions = [
	{
		title: 'How are you?',
		answer: {
			optionSelectedId: '',
			comment: '',
		},
		options: [
			{ id: 'testId-01', name: 'Bad', weight: 1 },
			{ id: 'testId-02', name: 'Fine', weight: 2 },
		],
	},
];

const initState = {
	EvaluationId: 'd362dbe0-53ff-471f-9185-8c802941ef4d',
	scholarId: '70939d04-efa2-4afa-9589-dc42b776d5ae',
	stageId: '74621a3b-7a59-4985-8259-b8222ffbbebb',
	userId: '3f82cdb4-ee0f-4d7a-bf6e-b8964214f56b',
	mode: 'Edit',
	overallRating: 80.0,
	generalComments: 'general comments',
	goals: 'goals',
	isRecommended: true,
	currentVersion: 1,
	isClosed: false,
	skills: [
		{
			skillId: '7e74c374-b18e-4f53-9d19-6aca07c3a7b2',
			name: 'Job Knowledge',
			score: 0,
			questions: questions,
		},
	],
};

describe('pages/dashboard/sections/scholars/components/evaluationForm', () => {
	describe('HTML Structure', () => {
		it('Should render with default properties', () => {
			const { container } = render(<EvaluationForm initState={initState} />);
			expect(container).toBeDefined();
			expect(container).toBeInstanceOf(HTMLDivElement);
		});
	});
	describe('Functionality', () => {
		it('should change general comment data when typing new chars', () => {
			const { container, getByText } = render(<EvaluationForm initState={initState} />);
			fireEvent.click(getByText('general comments'));
			const textArea = container.querySelector('.comment .content .field.input');
			fireEvent.change(textArea.firstChild, { target: { value: 'Something else' } });
			expect(textArea).toHaveTextContent('Something else');
		});

		it('should change goals comment data when typing new chars', () => {
			const { container, getByText } = render(<EvaluationForm initState={initState} />);
			fireEvent.click(getByText('goals'));
			const textArea = container.querySelector('.comment .content .field.input');
			fireEvent.change(textArea.firstChild, { target: { value: 'Another goal' } });
			expect(textArea).toHaveTextContent('Another goal');
		});

		it('Should is recommended change to positive case when positive option is clicked', () => {
			const { container } = render(<EvaluationForm initState={initState} />);
			const optionRadio = container.querySelector('.bundle-options-radio input[value="0"]');
			expect(optionRadio).not.toBeChecked();
			fireEvent.click(optionRadio);
			expect(optionRadio).toBeChecked();
		});

		it('Should is recommended change to negative case when negative option is clicked', () => {
			const { container } = render(<EvaluationForm initState={initState} />);
			const optionRadio = container.querySelector('.bundle-options-radio input[value="0"]');
			expect(optionRadio).not.toBeChecked();
			fireEvent.click(optionRadio);
			expect(optionRadio).toBeChecked();
		});

		it('Should the state change when the answer of any question changes', () => {
			const { getAllByRole } = render(<EvaluationForm initState={initState} />);
			const badOptionInput = getAllByRole('radio')[0];
			expect(badOptionInput).not.toBeChecked();
			fireEvent.click(badOptionInput);
			expect(badOptionInput).toBeChecked();
		});

		it('Should reset the state when undo button is clicked', () => {
			const { container } = render(<EvaluationForm initState={initState} />);
			const undoButton = container.querySelector('.undo-button');

			const optionRadio = container.querySelector('.bundle-options-radio input[value="0"]');
			expect(optionRadio).not.toBeChecked();
			fireEvent.click(optionRadio);
			expect(optionRadio).toBeChecked();

			fireEvent.click(undoButton);
			expect(optionRadio).not.toBeChecked();
		});

		it('Should submit the evaluation when save button is clicked', () => {
			const onSubmitMock = jest.fn((value) => value);
			const { container } = render(
				<EvaluationForm initState={initState} onSubmit={onSubmitMock} />
			);
			const saveButton = container.querySelector('.save-button');

			fireEvent.click(saveButton);
			expect(onSubmitMock).toBeCalledTimes(1);
			expect(onSubmitMock.mock.results[0].value).toStrictEqual(initState);
		});
	});
});
