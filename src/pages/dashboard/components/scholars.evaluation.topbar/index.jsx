import Button from 'components/button';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Noop from 'helpers/Noop';
import './index.css';

/**
 * Renders a Evaluation header with buttons
 *
 * @param {object} props - Component properties
 * @returns {React.Component} - Top Bar Evaluation
 */
function EvaluationTopBar(props) {
	const { value, readOnly, isClosed, onFinish, onReload, showFinishButton } = props;
	return (
		<div className={'evaluation-top-bar'}>
			<div className={'title'}>
				<span className={'stage'}>{value.name}</span>
				<span>{value.evaluation}</span>
				<span className={'version'}>{value.version}</span>
			</div>
			{isClosed ? (
				<div className={'status'}>
					{value.finished}
					<Icon name='check' className='icon' />
				</div>
			) : (
				<div className={'buttons'}>
					<Button
						basic
						content={value.reload}
						onClick={() => onReload()}
						icon={<Icon name='refresh' className='icon' />}
					/>
					{!readOnly && showFinishButton && (
						<Button
							basic
							icon={<Icon name='clipboard-check' className='icon' />}
							content={value.finish}
							onClick={() => onFinish()}
						/>
					)}
				</div>
			)}
		</div>
	);
}

EvaluationTopBar.propTypes = {
	value: PropTypes.object,
	onFinish: PropTypes.func,
	onReload: PropTypes.func,
	readOnly: PropTypes.bool,
	isClosed: PropTypes.bool,
	showFinishButton: PropTypes.bool,
};

EvaluationTopBar.defaultProps = {
	value: {
		name: '',
		version: '',
		evaluation: '',
		finished: '',
		reload: '',
		finish: '',
	},
	readOnly: true,
	isClosed: false,
	showFinishButton: false,
	onFinish: Noop,
	onReload: Noop,
};
export default EvaluationTopBar;
