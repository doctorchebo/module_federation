import React from 'react';
import { Card } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import './styles.css';

/**
 * @param {object} props - get all the data sent it from a parent
 * @param {string} props.name - title of the widget or component
 * @param {string} props.component - the widget itself
 * @returns {React.Component} -
 */
export default function CardSummary({ name, component }) {
	return (
		<Card className='content-widgets'>
			{name !== undefined && (
				<Card.Content className='summary-card-content'>
					<Card.Header>{name}</Card.Header>
				</Card.Content>
			)}
			{component !== undefined && component}
		</Card>
	);
}

CardSummary.propTypes = {
	name: PropTypes.string,
	component: PropTypes.node,
};
