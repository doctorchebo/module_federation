import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Noop from 'helpers/Noop';
import './index.css';

const classNames = require('classnames');

/**
 * @param {object} props -
 * @returns {React.Component} -
 */
function RatingItem(props) {
	const { active, value, onClick, hover, setHover, icon } = props;
	const className = classNames({ selected: active || hover });

	return (
		<span
			className='rating-item'
			onClick={() => onClick(value)}
			onMouseEnter={() => setHover(value)}
			onMouseLeave={() => setHover(0)}
		>
			<Icon className={className} name={icon} />
		</span>
	);
}

RatingItem.propTypes = {
	active: PropTypes.bool,
	hover: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func,
	setHover: PropTypes.func,
	value: PropTypes.number,
};

RatingItem.defaultProps = {
	onClick: Noop,
	setHover: Noop,
};

export default RatingItem;
