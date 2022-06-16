import React from 'react';
import { Image, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.css';

/**
 * @param {object} props -
 * @returns {object} -
 */
export default function ProgramElement(props) {
	const { img, text } = props;
	return (
		<Segment basic className='program_container'>
			<Image src={img} size='medium' className='program_container_img' />
			<Header inverted as='h1' content={text} className='program_container_text' />
		</Segment>
	);
}

ProgramElement.propTypes = {
	img: PropTypes.string,
	text: PropTypes.string,
};
