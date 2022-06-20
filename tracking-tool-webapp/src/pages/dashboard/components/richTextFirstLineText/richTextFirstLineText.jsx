import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * this is a component that can be used in other side such as evaluation page
 *
 * @param {string} props description to show in events
 * @returns {React.Component} Show description in events
 */
const RichTextFirstLineText = (props) => {
	let { description } = props;
	const blocks = '{"blocks":[{"key"';
	let textFormat;

	if (description?.includes(blocks)) {
		let o1 = JSON.parse(description);
		textFormat = o1.blocks[0].text;
	} else {
		textFormat = description;
	}

	return textFormat;
};

RichTextFirstLineText.propTypes = {
	description: PropTypes.string,
};

RichTextFirstLineText.defaultProps = {
	description: '',
};

export default RichTextFirstLineText;
