import React from 'react';
import './index.css';

/**
 * Red Dot to mark in label as required
 *
 * @param {object} props Properties
 * @returns {React.Component} Rendered
 */
function RequiredDot(props) {
	return (
		<p className={'required-dot'} {...props}>
			{'*'}
		</p>
	);
}

export default RequiredDot;
