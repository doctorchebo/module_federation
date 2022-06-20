import React from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'semantic-ui-react';
import './index.css';
/**
 *
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function TotalReport(props) {
	const { icon, message, extra } = props;
	return (
		<div>
			<Icon corner='top left' name={icon.name} color={icon.color} />
			<label className={'message-' + icon.color}>{message}</label> <br />
			<label className='extra'>{extra}</label>
		</div>
	);
}

TotalReport.propTypes = {
	icon: PropTypes.object,
	message: PropTypes.string,
	extra: PropTypes.string,
};
