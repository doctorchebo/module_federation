import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';
import './index.css';
import Noop from 'helpers/Noop';
import classNames from 'classnames';
import locale from 'pages/dashboard/locale/en.json';

/**
 * Overall rating component.
 *
 * @param {object} properties Component properties.
 * @returns {React.Component} Component for display overall rating.
 */
export default function ScholarsOverallRating(properties) {
	const { average, content, name, onChange, readOnly } = properties;
	const className = classNames('overall-rating', { readonly: readOnly });

	return (
		<span className={className}>
			<span className='content'>{content}</span>
			<span className='spacing' />
			<Input
				readOnly={readOnly}
				type='number'
				value={average}
				name={name}
				onChange={(e, { name, value }) => onChange(name, value)}
				step={0.01}
				size='mini'
			/>
		</span>
	);
}

ScholarsOverallRating.propTypes = {
	average: PropTypes.number,
	content: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	readOnly: PropTypes.bool,
};

ScholarsOverallRating.defaultProps = {
	average: 50,
	content: locale.scholars.overallRating.content,
	name: 'average',
	onChange: Noop,
	readOnly: true,
};
