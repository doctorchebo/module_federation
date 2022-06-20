import React, { useState } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import './index.css';
import locale from '../../locale/en.json';

/**
 * @param {object} props -props
 * @param {object} props.candidate - information of candidate to be displayed in a card
 * @param {number} props.index - index to identify the draggable element
 * @param {object} props.snapshot - necessary to interact with father component
 * @returns {React.Component} -
 */
const CandidatesActivitiesCard = ({ candidate, index, snapshot }) => {
	const { activityTypes } = locale;
	const [isExpanded, setIsExpanded] = useState(false);
	const getItemStyle = (isDragging, draggableStyle) => ({
		userSelect: 'none',
		padding: 2,
		margin: '0.5rem 0.5rem 1rem 0.5rem',
		background: isDragging ? 'lightgreen' : 'transparent',
		...draggableStyle,
	});

	const getNextOrPreviousActivity = (activityType) => {
		const { notStarted, passed } = activityTypes.states;
		if (activityType === 'Postulation') {
			return ` ${activityTypes.informativeTalk}: ${notStarted}`;
		} else {
			return ` ${activityTypes.postulation}: ${passed}`;
		}
	};

	return (
		<Draggable key={candidate.id} draggableId={candidate.id} index={index}>
			{(provided) => (
				<div
					className='candidate-card'
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
				>
					<Card id='card-container'>
						<Card.Content extra id='icon-card-candidate'>
							<Icon
								onClick={() => setIsExpanded(!isExpanded)}
								name={!isExpanded ? 'angle right' : 'angle down'}
							/>
						</Card.Content>
						<Card.Content id='content-card-candidate'>
							<Image
								spaced
								floated='left'
								size='mini'
								circular='true'
								src={imageProfile}
							/>
							<Card.Content>
								<Card.Header name='card-header'>
									{candidate.person.fullName}
								</Card.Header>
								<Card.Meta name='card-metadata'>
									{candidate.person.personalEmail}
								</Card.Meta>
								<Card.Meta name='card-metadata' extra>
									<span>
										<Icon name='phone square' />
										{candidate.person.phoneNumber}
									</span>
								</Card.Meta>
							</Card.Content>
						</Card.Content>
					</Card>
					{isExpanded ? (
						<Card.Content fluid textAlign='left' id='expandable'>
							<div>
								<b>Activities:</b>
								<br />- {candidate.activity.activityType.description}: In Progress
								<br />-
								{getNextOrPreviousActivity(
									candidate.activity.activityType.description
								)}
							</div>
						</Card.Content>
					) : null}
				</div>
			)}
		</Draggable>
	);
};

CandidatesActivitiesCard.propTypes = {
	candidate: PropTypes.object,
	index: PropTypes.number,
	snapshot: PropTypes.object,
};
CandidatesActivitiesCard.defaultProps = {
	candidate: null,
	index: 0,
};

export default CandidatesActivitiesCard;
