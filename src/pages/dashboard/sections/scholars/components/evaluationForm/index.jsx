import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';
import Form from 'components/form';
import initState from 'helpers/data/DevEvaluation.json';
import BundleQuestions from 'components/bundleQuestion';
import Button from 'components/button';
import ScholarsOverallRating from 'pages/dashboard/components/scholars.overall.rating';
import CommentBox from 'pages/dashboard/components/scholar.comment.box';
import Radio from 'components/radio';
import locale from '../../locale/en.json';
import Noop from 'helpers/Noop';
import './index.css';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Form evaluation
 */
function EvaluationForm(props) {
	const { initState, onSubmit, readOnly } = props;
	const { evaluation } = locale;
	const [state, setState] = useState(initState);
	const { skills } = state;

	useEffect(() => {
		setState(initState);
	}, [initState]);
	/**
	 * @param {*} name -
	 * @param {*} value -
	 */
	function handleOnChange(name, value) {
		if (initState.mode.toLowerCase() !== 'readonly') {
			setState(
				produce(state, (draft) => {
					draft[name] = value;
				})
			);
		}
	}
	/**
	 * @param {*} id -
	 * @param {*} name -
	 * @param {*} valueChanged -
	 */
	function handleOnSkillChange(id, name, valueChanged) {
		if (initState.mode.toLowerCase() !== 'readonly') {
			let newState = skills.map((skill) => {
				let skillCopy = { ...skill };
				if (skill.skillId === id) {
					skillCopy[name] = valueChanged;
				}
				return skillCopy;
			});
			setState(
				produce(state, (draft) => {
					draft.skills = newState;
				})
			);
		}
	}

	/**
	 *
	 */
	function handleSubmit() {
		onSubmit(state);
	}

	/**
	 *
	 */
	function undoChanges() {
		setState(initState);
	}

	return (
		<div className='evaluation-form'>
			<Form>
				{skills.map((skill) => (
					<BundleQuestions
						key={skill.skillId}
						{...skill}
						readOnly={readOnly}
						onChange={handleOnSkillChange}
					/>
				))}
				<Form.Group className='final-part'>
					<div className='container'>
						<Form.Field>
							<ScholarsOverallRating
								readOnly={initState.isClosed}
								average={state.overallRating}
								name={'overallRating'}
								onChange={handleOnChange}
							/>
						</Form.Field>
						<Form.Field className='recommend'>
							<span className='question'>{evaluation.isRecommended}</span>
							<Radio
								className={'bundle-options-radio'}
								visibility={'hidden'}
								label={evaluation.recommendedYes}
								value={1}
								checked={state.isRecommended}
								onChange={() => handleOnChange('isRecommended', true)}
							/>
							<Radio
								className={'bundle-options-radio'}
								visibility={'hidden'}
								label={evaluation.recommendedNo}
								value={0}
								checked={!state.isRecommended}
								onChange={() => handleOnChange('isRecommended', false)}
							/>
						</Form.Field>
					</div>
				</Form.Group>
				<Form.Group className='final-comments'>
					<Form.Field className='comment'>
						<CommentBox
							readonly={state.mode.toLowerCase() === 'readonly' || readOnly}
							value={{
								title: evaluation.generalComments,
								content: state.generalComments,
							}}
							onChange={(value) => handleOnChange('generalComments', value)}
						/>
					</Form.Field>
					<Form.Field className='comment'>
						<CommentBox
							readonly={state.mode.toLowerCase() === 'readonly' || readOnly}
							value={{
								title: evaluation.goalsComments,
								content: state.goals,
							}}
							onChange={(value) => handleOnChange('goals', value)}
						/>
					</Form.Field>
				</Form.Group>
			</Form>
			{initState.mode.toLowerCase() !== 'readonly' && !readOnly ? (
				<Form.Group>
					<Button
						floated={'right'}
						className='save-button'
						content={evaluation.save}
						onClick={handleSubmit}
					/>
					<Button
						floated={'right'}
						className='undo-button'
						content={evaluation.undo}
						onClick={undoChanges}
					/>
				</Form.Group>
			) : null}
		</div>
	);
}

EvaluationForm.propTypes = {
	initState: PropTypes.object,
	onSubmit: PropTypes.func,
	readOnly: PropTypes.bool,
};

EvaluationForm.defaultProps = {
	initState: initState,
	onSubmit: Noop,
	readOnly: false,
};

export default EvaluationForm;
