import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Card, Image } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import './styles.css';

/**
 * @param {object} properties - Component properties
 * @param {object} properties.value - Scholar information
 * @returns {React.Component} - Custom Card for show all the events for scholar
 */
export default function ScholarCard(properties) {
	const { value: model } = properties;
	return (
		<div className='scholar-card'>
			<Card name='card-container'>
				<Card.Content>
					<Image
						spaced
						floated='left'
						size='mini'
						src={imageProfile}
						as={Link}
						to={model.evaluationUrl}
					/>
					<Card.Header name='card-header' as={Link} to={model.evaluationUrl}>
						{model.fullName}
					</Card.Header>
					<Card.Meta
						name='card-metadata'
						className={ClassNames(model.scholarStatus?.toLowerCase())}
					>
						{model.scholarStatus}
					</Card.Meta>
				</Card.Content>
			</Card>
		</div>
	);
}

ScholarCard.propTypes = {
	value: PropTypes.object,
};

ScholarCard.defaultProps = {
	value: {},
};
