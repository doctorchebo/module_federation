import React from 'react';
import { Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.css';
/**
 *
 * @param {object} props -
 * @returns {React.Component} -
 */
export default function Information(props) {
	const { value } = props;
	const { header, body } = value;
	return (
		<div className='information-content'>
			<Header className='information-title' color={header.color} as='h3'>
				{header.value}
			</Header>
			<p className='information-body'>{body}</p>
		</div>
	);
}
Information.propTypes = {
	value: PropTypes.object,
};
