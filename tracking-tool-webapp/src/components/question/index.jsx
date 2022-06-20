import PropTypes from 'prop-types';
import Form from 'components/form';
import Icon from 'components/icon';
import Input from 'components/input';
import Radio from 'components/radio';
import React, { useRef, useState } from 'react';
import Noop from 'helpers/Noop';
import sort from 'helpers/sort';
import './index.css';
/**
 * @param {object} props question, bundleScore, currentScore, comment
 * @returns {React.Component} form.field component
 */
function Question(props) {
	const { question, bundleScore, currentScore, comment, onChange, readOnly } = props;

	const [state, setState] = useState({
		icon: { color: 'Grey' },
		text: { disabled: true, type: 'hidden', focus: useRef(null) },
	});
	const color = state.icon.color;
	const { disabled, focus } = state.text;

	/**
	 * @param {object}properties props to update
	 */
	function handleStateChange(properties) {
		setState((state) => ({ ...state, ...properties }));
	}
	/**
	 * function to manage whe user click icon to enable
	 * the comment section
	 */
	function handleClickIcon() {
		let color = state.icon.color === 'Grey' ? 'Green' : 'Grey';
		if (color === 'Green') {
			handleStateChange({
				icon: { ...state.icon, color },
				text: { ...state.text, disabled: false },
			});
			setTimeout(function () {
				focus.current.focus();
			}, 10);
		} else {
			handleStateChange({
				icon: { ...state.icon, color },
				text: { ...state.text, disabled: true },
			});
		}
	}
	const sortedBundleScore = sort('weight', bundleScore);
	return (
		<>
			<div className={'question-item'}>
				<p>
					{question}
					<Icon
						name={'annotation'}
						color={color}
						onClick={handleClickIcon}
						className={'annotation-check-icon'}
					/>
				</p>
			</div>
			<Form.Field className={'bundle-options'}>
				{sortedBundleScore.map((option, key) => (
					<Radio
						className={'bundle-options-radio'}
						visibility={'hidden'}
						key={key}
						label={option.name}
						value={option.id}
						checked={currentScore === option.id}
						onChange={(e, { value }) => onChange('optionSelectedId', value)}
					/>
				))}
			</Form.Field>
			{(comment || !disabled) && (
				<Form.Field>
					<Input
						className={'bundle-options-comment'}
						fluid
						disabled={disabled}
						placeholder='Additional description'
						ref={focus}
						value={comment}
						onChange={(e, { value }) => onChange('comment', value)}
						readOnly={readOnly}
					/>
				</Form.Field>
			)}
		</>
	);
}

Question.propTypes = {
	question: PropTypes.string,
	bundleScore: PropTypes.array,
	currentScore: PropTypes.string,
	comment: PropTypes.string,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};
Question.defaultProps = {
	question: 'Im a Question',
	bundleScore: [],
	currentScore: '',
	comment: '',
	onChange: Noop,
	readOnly: false,
};

export default Question;
