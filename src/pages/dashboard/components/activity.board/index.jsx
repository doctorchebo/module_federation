import React from 'react';
import CandidatesActivitiesCard from '../candidates.activities.card';
import { Droppable } from 'react-beautiful-dnd';
import { Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';
import locale from '../../sections/programVersions/views/ProgramVersionDetailsView/locale/en.json';
import { imageUsersMissing } from 'helpers/Dashboard';

/**
 * @param {string} props - candidates - activities data.
 * @returns {React.Component} -
 */
const ActivityBoard = ({ list, index }) => {
	const grid = 1;
	const getListStyle = (isDraggingOver) => ({
		background: isDraggingOver ? 'var(--bg-primary-color)' : 'var(--border-color)',
		padding: `${grid}rem`,
		width: '100%',
		margin: '0.25rem',
		'border-radius': '10px',
	});
	return (
		<>
			<Droppable key={index} droppableId={`${index}`}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						style={getListStyle(snapshot.isDraggingOver)}
						{...provided.droppableProps}
					>
						<div id='container'>
							<Header className='title-text' as='h2'>
								{list.activityType}
							</Header>
						</div>
						{list.candidates.length > 0 ? (
							list.candidates.map((item, index) => (
								<CandidatesActivitiesCard
									candidate={item}
									key={item.id}
									index={index}
									snapshot={snapshot}
								/>
							))
						) : (
							<div className='empty-content'>
								<Image spaced size='medium' src={imageUsersMissing} />
								<div>{locale.candidates_not_found}</div>
							</div>
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</>
	);
};

ActivityBoard.propTypes = {
	list: PropTypes.object,
	index: PropTypes.string,
};
ActivityBoard.defaultProps = {
	list: null,
	index: 0,
};

export default ActivityBoard;
