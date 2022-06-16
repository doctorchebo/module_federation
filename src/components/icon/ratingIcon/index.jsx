import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';
import './index.css';

/**
 * @param {object} props -
 * @returns {React.Component} -
 */
function RatingIcon(props) {
	const { className } = props;
	return (
		<span className='rating-icon'>
			<Progress size='tiny' className={className} percent={100} />
		</span>
	);
}

RatingIcon.propTypes = {
	className: PropTypes.string,
};

export default RatingIcon;
