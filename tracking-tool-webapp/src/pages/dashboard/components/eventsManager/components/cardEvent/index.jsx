import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { decodeToken } from 'helpers/tokenDecoder';
import Icon from 'components/icon';
import { ProfileProvider } from 'pages/profile/context';
import ProfilePicture from 'pages/profile/components/profilePicture';
import RichTextShowMore from 'components/richTextShowMore';
import locale from '../../locale/en.json';
import './styles.css';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom Card for show all the events for scholar
 */
function CardEvent(props) {
	const { event, onAction, onActionViewContent } = props;
	const DATE_SETTINGS = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	};
	const { tooltip } = locale;
	const { edit, details } = tooltip;

	return (
		<div className='card-event'>
			<Card name='card-container'>
				<div className='img-container'>
					<ProfileProvider>
						<ProfilePicture userId={event.userId} />
					</ProfileProvider>
				</div>
				<Card.Content>
					<Card.Header className='card-icon' textAlign='left' name='card-header'>
						<div>
							{event.user}
							<h4> {locale.textAddEventIn} </h4> <h3>{event.stage}</h3>
						</div>
						<div className='content-icon'>
							{event.userId === decodeToken().sub && (
								<Icon
									className={'icon'}
									name={'pencil-alt'}
									onClick={() => {
										onAction(event);
										return event;
									}}
									tooltipText={edit}
								/>
							)}
							{event.userId === decodeToken().sub && (
								<Icon
									className={'icon'}
									name={'view-list'}
									onClick={() => {
										onActionViewContent(event);
										return event;
									}}
									tooltipText={details}
								/>
							)}
						</div>
					</Card.Header>
					<Card.Header name='card-tittle'>{event.title}</Card.Header>
					<Card.Meta name='card-metadata'>
						<span className='subject'>{event.eventType.name}</span>
						{new Date(event.modifiedAt).toLocaleString([], DATE_SETTINGS)}
						<span className='event-modified'>
							{event.createdAt !== event.modifiedAt ? ` · ${locale.updated}` : null}
						</span>
					</Card.Meta>
					<Card.Description name='card-description'>
						<RichTextShowMore description={event.description} />
					</Card.Description>
				</Card.Content>
			</Card>
		</div>
	);
}

CardEvent.propTypes = {
	event: PropTypes.object,
	onAction: PropTypes.func,
	onActionViewContent: PropTypes.func,
};
CardEvent.defaultProps = {
	event: {
		user: '',
		program: '',
		title: '',
		modifiedAt: '',
		type: '',
		description: '',
	},
};

export default CardEvent;
