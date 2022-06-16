/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { sectionMock, sectionMockChanged } from '../__mocks__';
import BundleQuestion from '..';

/**
 * Render a Bundle component
 *
 * @param {*} props Properties
 * @returns {*} a Approval list to test
 */
function customRender(props) {
	const { container } = render(<BundleQuestion {...props} />);
	return container;
}

describe('components/bundleQuestion', () => {
	describe('HTML structure', () => {
		it('Should render bundleQuestion with default properties', () => {
			const element = customRender();
			expect(element).toBeDefined();
			expect(element.firstChild).toBeInstanceOf(HTMLElement);
		});

		it('Should render a seven elements from radio items in total', () => {
			const element = customRender({ ...sectionMock });
			const items = element.querySelectorAll('.bundle-options-radio');
			expect(items).toBeDefined();
			expect(items).toHaveLength(7);
		});

		it('Should render a two elements from comment items in total', () => {
			const element = customRender({ ...sectionMock });
			const items = element.querySelectorAll('.bundle-options-comment');
			expect(items).toBeDefined();
			expect(items).toHaveLength(2);
		});
	});

	describe('OnChange Onclick', () => {
		it('Should change values after update', () => {
			const onChangeMock = jest.fn((skillId, name, newValue) => ({
				skillId,
				name,
				newValue,
			}));
			const element = customRender({ ...sectionMock, onChange: onChangeMock });
			const item = element.querySelector('.bundle-options-comment input');
			const icon = element.querySelector('.annotation-check-icon');
			fireEvent.click(icon);
			fireEvent.change(item, { target: { value: 'not im not okay' } });
			expect(onChangeMock).toBeCalled();
			expect(onChangeMock.mock.calls).toHaveLength(1);
			expect(onChangeMock.mock.results[0].value).toStrictEqual(sectionMockChanged);
		});

		it('Should call onChange action when click on some of the options', () => {
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
			const expectedNewValue = [
				{
					title: 'How are you?',
					answer: {
						optionSelectedId: 'testId-02',
						comment: '',
					},
					options: [
						{ id: 'testId-01', name: 'Bad', weight: 1 },
						{ id: 'testId-02', name: 'Fine', weight: 2 },
					],
				},
			];
			const onChangeMock = jest.fn((skillId, name, newValue) => ({
				skillId,
				name,
				newValue,
			}));
			const { container } = render(
				<BundleQuestion
					skillId='someSkillId'
					questions={questions}
					onChange={onChangeMock}
				/>
			);
			const fineOptionInput = container.querySelector('input[value="testId-02"]');
			fireEvent.click(fineOptionInput);
			expect(onChangeMock).toBeCalledTimes(1);
			expect(onChangeMock.mock.results[0].value).toStrictEqual({
				skillId: 'someSkillId',
				name: 'questions',
				newValue: expectedNewValue,
			});
		});
	});
});
