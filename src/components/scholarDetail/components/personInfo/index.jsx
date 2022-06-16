import React from 'react';
import PropTypes from 'prop-types';
import { imageProfile } from 'helpers/Dashboard';
import { Header, Image } from 'semantic-ui-react';

/**
 * @param {object} props - Properties
 * @returns {React.Component} - Scholar Person Information.
 */
function PersonInfo(props) {
	const { fullName, phoneNumber, currentCity, imageProfile } = props;

	return (
		<Header as='h2' className='scholar-image-date' name='Person-Info'>
			<Image name='Profile-Image' circular src={imageProfile} />
			<Header.Content>
				<span name='Full-Name'>{fullName}</span>
				<Header.Subheader name='Phone-Number'>{phoneNumber}</Header.Subheader>
				<Header.Subheader name='Current-City'>{currentCity}</Header.Subheader>
			</Header.Content>
		</Header>
	);
}

PersonInfo.propTypes = {
	fullName: PropTypes.string,
	phoneNumber: PropTypes.string,
	currentCity: PropTypes.string,
	imageProfile: PropTypes.string,
};

PersonInfo.defaultProps = {
	fullName: 'Osmar Ugarte',
	phoneNumber: '',
	currentCity: '',
	imageProfile: imageProfile,
};

export default PersonInfo;
