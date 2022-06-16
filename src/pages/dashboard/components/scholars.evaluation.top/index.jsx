import React from 'react';
import PropTypes from 'prop-types';
import locale from 'pages/dashboard/locale/en.json';
import { Dropdown } from 'semantic-ui-react';
import { convertStagesToOptions } from 'pages/dashboard/helpers';
import Noop from 'helpers/Noop';
import './index.css';

/**
 *
 * @param {object} properties Properties.
 * @param {string} properties.stageId stage id
 * @param {Array} properties.stages list of stages
 * @returns {React.Component} ScholarsEvaluationTop component.
 */
export default function ScholarsEvaluationTop(properties) {
	const { stages, onChange, stageId } = properties;
	const { scholars } = locale;

	return (
		<div className='evaluation-top'>
			<div className='container'>
				<span className='label'>{scholars.evaluationTop.per}</span>
				&nbsp;
				<span className='per'>{scholars.evaluationTop.stage}</span>
				<Dropdown
					placeholder={scholars.evaluationTop.choose}
					options={convertStagesToOptions(stages)}
					onChange={(e, { value }) => onChange(value)}
					value={stageId}
					selection
				/>
			</div>
		</div>
	);
}

ScholarsEvaluationTop.propTypes = {
	stages: PropTypes.array,
	onChange: PropTypes.func,
	stageId: PropTypes.string,
};

ScholarsEvaluationTop.defaultProps = {
	stages: [],
	onChange: Noop,
	stageId: '',
};
