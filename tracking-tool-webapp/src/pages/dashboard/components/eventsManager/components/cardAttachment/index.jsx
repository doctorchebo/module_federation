import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import Icon from 'components/icon';
import './styles.css';

/**
 *
 * @param {object} props - Component properties.
 * @returns {React.Component} - Custom card for show all the events for attachments.
 */
function CardAttachment(props) {
	const { attachment, event, onAction } = props;

	return (
		<div className='card-attachment'>
			<Card className='card-container'>
				<Card.Content>
					<Card.Header className='card-icon'>
						<div className='content-header'>
							<Icon className={'icon'} name={'document-text'} />
							<div>{attachment.name}</div>
						</div>
						<Icon
							className={'icon'}
							name={'x'}
							onClick={() => {
								onAction(attachment, event);
							}}
						/>
					</Card.Header>
				</Card.Content>
			</Card>
		</div>
	);
}

CardAttachment.propTypes = {
	attachment: PropTypes.object,
	event: PropTypes.object,
	onAction: PropTypes.func,
};

export default CardAttachment;
