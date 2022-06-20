import React from 'react';
import { Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Progress bar component
 *
 * @param {object} props - shared data
 * @returns {React.Component} Generic Progress Bar component
 */
export default function FileProgressBar(props) {
	const { value } = props;
	return <Progress percent={value} indicating />;
}

FileProgressBar.propTypes = {
	value: PropTypes.number,
};
