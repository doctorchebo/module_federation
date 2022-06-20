import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { textIconStyle, textIconAlign } from 'helpers/Dashboard';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function TextIcon(props) {
	return (
		<div style={textIconStyle}>
			<Icon size='large' color={props.color} name={props.name} />
			<div style={textIconAlign} hidden={props.hideText}>
				{props.children}
			</div>
		</div>
	);
}

TextIcon.propTypes = {
	hideText: PropTypes.string,
	color: PropTypes.string,
	name: PropTypes.string,
	children: PropTypes.string,
};
