import React from 'react';
import PropTypes from 'prop-types';
import locale from 'pages/dashboard/locale/en.json';
import { Image } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import './index.css';

/**
 * @param {object} props -
 * @returns {React.Component} -
 */
function ScholarInformation(props) {
	const { fullName, phoneNumber, currentCity } = props;
	return (
		<div className='scholar information'>
			<div className='picture'>
				<Image circular src={imageProfile} />
			</div>
			<div className='details'>
				<span className='item name'>{fullName}</span>
				<span className='item'>{locale.evaluation.scholar}</span>
				<span className='item'>{phoneNumber}</span>
				<span className='item'>{currentCity}</span>
			</div>
		</div>
	);
}

ScholarInformation.propTypes = {
	fullName: PropTypes.string,
	phoneNumber: PropTypes.string,
	currentCity: PropTypes.string,
};

ScholarInformation.defaultProps = {
	fullName: 'Jorge Cepeda',
	phoneNumber: '(+591) 77889955',
	currentCity: 'La Paz',
};

export default ScholarInformation;
