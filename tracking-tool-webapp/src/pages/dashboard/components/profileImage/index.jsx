import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

const ProfileImage = ({ color, src, size }) => {
	if (color === '') {
		color = 'white';
	}
	const styles = {
		margin: '0.7rem',
		boxShadow: `0px 0px 0px 0.2rem white, 0px 0px 0px 0.42rem ${color}`,
	};
	return <Image style={styles} spaced circular size={size} src={src} />;
};

ProfileImage.propTypes = {
	src: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.string,
};

ProfileImage.defaultProps = {
	color: 'white',
	size: 'mini',
};

export default ProfileImage;
