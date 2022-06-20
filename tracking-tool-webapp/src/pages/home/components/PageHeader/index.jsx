import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

import { Container, Header } from 'semantic-ui-react';

/**
 *
 * @param {object} props properties
 * @returns {React.Component} Page header
 */
export default function PageHeader(props) {
	const { appName, subtitle } = props.constants;
	return (
		<Container className='header-container'>
			<Header inverted as='h2' content={appName} className='main-title' />
			<Header as='h3' className='sub-title' content={subtitle} />
		</Container>
	);
}

PageHeader.propTypes = {
	constants: PropTypes.object,
	headerAppName: PropTypes.string,
	headerSubTitle: PropTypes.string,
};
