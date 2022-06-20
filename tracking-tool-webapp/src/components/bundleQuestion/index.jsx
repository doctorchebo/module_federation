import PropTypes from 'prop-types';
import Form from 'components/form';
import React, { useState } from 'react';
import Question from 'components/question';
import Noop from 'helpers/Noop';
import Rating from 'components/rating';
import './index.css';
import { Accordion, Icon } from 'semantic-ui-react';

/**
 * @param {object} props title and list of questions
 * @returns {React.Component} form.group component
 */
function BundleQuestion(props) {
	const { skillId, score, name, questions, onChange, readOnly } = props;
	/**
	 *
	 * @param {string} questionId id question
	 * @param {string} name currentScore(punctuation)
	 * @param {string} value the value selected
	 */
	function handleOnChange(questionId, name, value) {
		let newState = questions.map((question) => {
			let questionCopy = { ...question };
			if (questionCopy.questionId === questionId) {
				questionCopy.answer = { ...question.answer };
				questionCopy.answer[name] = value;
			}
			return questionCopy;
		});
		onChange(skillId, 'questions', newState);
	}

	const [activeIndex, setActiveIndex] = useState('');

	/**
	 * @param {object} event - React's original SyntheticEvent.
	 * @param {object} AcordeonProps - All props.
	 */
	function handleClick(event, AcordeonProps) {
		const { index } = AcordeonProps;
		const newIndex = activeIndex === index ? '' : index;
		setActiveIndex(newIndex);
	}

	return (
		<>
			<Accordion styled>
				<Accordion.Title active={activeIndex === name} index={name} onClick={handleClick}>
					<div className={'skill-header'}>
						<Icon name='dropdown' />
						<p className={'skill-header-title'}>{name}</p>
						<Rating
							className={'skill-header-rating'}
							rating={score}
							onChange={(value) => onChange(skillId, 'score', value)}
						/>
					</div>
				</Accordion.Title>
				<Accordion.Content active={activeIndex === name}>
					<ul>
						<Form.Group className='skill-section'>
							{questions.map((question, key) => (
								<li key={key}>
									<Question
										question={question.title}
										key={key}
										bundleScore={question.options}
										currentScore={question.answer.optionSelectedId}
										comment={question.answer.comment}
										readOnly={readOnly}
										onChange={(name, value) =>
											handleOnChange(question.questionId, name, value)
										}
									/>
								</li>
							))}
						</Form.Group>
					</ul>
				</Accordion.Content>
			</Accordion>
		</>
	);
}
BundleQuestion.propTypes = {
	skillId: PropTypes.string,
	score: PropTypes.number,
	name: PropTypes.string,
	questions: PropTypes.array,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};

BundleQuestion.defaultProps = {
	name: 'Im a Header',
	questions: [],
	onChange: Noop,
	readOnly: false,
};

export default BundleQuestion;
