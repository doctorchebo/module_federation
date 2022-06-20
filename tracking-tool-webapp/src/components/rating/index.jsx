import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RatingItem from './components/ratingItem';
import Noop from 'helpers/Noop';
import './index.css';

/**
 *
 * @param {object} props -
 * @returns {React.Component} -
 */
function Rating(props) {
	const { rating, maxRating, onChange } = props;
	const [eHover, setEHover] = useState(0);
	let content = [];
	for (let i = 1; i <= maxRating; i++) {
		content.push(
			<RatingItem
				value={i}
				rating={rating}
				active={i <= rating}
				hover={i <= eHover}
				key={i}
				setHover={(value) => setEHover(value)}
				onClick={(value) => onChange(value)}
				icon={'rating'}
			/>
		);
	}

	return <div className='rating-component'>{content}</div>;
}

Rating.propTypes = {
	rating: PropTypes.number,
	maxRating: PropTypes.number,
	onChange: PropTypes.func,
};

Rating.defaultProps = {
	maxRating: 5,
	onChange: Noop,
	rating: 0,
};

export default Rating;
