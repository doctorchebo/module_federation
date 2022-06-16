import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import Noop from 'helpers/Noop';
import Item from './item';

/**
 * @param {object} properties - properties
 * @returns {React.Component} - Notification list component
 */
export default function List(properties) {
	const { value, action } = properties;

	return (
		<ul className='list'>
			{value.map((item, index) => (
				<Item key={index} {...item} onClick={action} />
			))}
		</ul>
	);
}

List.propTypes = {
	value: PropTypes.array,
	action: PropTypes.func,
};

List.defaultProps = {
	value: [],
	action: Noop,
};
