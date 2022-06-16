import React from 'react';
import PropTypes from 'prop-types';
import draftToHtml from 'draftjs-to-html';
import './styles.css';

/**
 * this is a component that can be used in other side such as evaluation page
 *
 * @param {string} props description to show in events
 * @returns {React.Component} Show description in events
 */

const RichText = (props) => {
	const { description } = props;
	const blocks = '{"blocks":[{"key"';
	let htmlFormat;

	if (description.includes(blocks)) {
		htmlFormat = draftToHtml(JSON.parse(description));
	} else {
		htmlFormat = description;
	}

	return (
		<div className='container-rich-text'>
			<div className='rich-text-show' dangerouslySetInnerHTML={{ __html: htmlFormat }}></div>
		</div>
	);
};

RichText.propTypes = {
	description: PropTypes.string,
};

RichText.defaultProps = {
	description: '',
};

export default RichText;
