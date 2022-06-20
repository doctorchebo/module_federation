import React from 'react';
import PropTypes from 'prop-types';
import CardEvent from '../cardEvent';

/**
 * this is a component that can be used in other side such as evaluation page
 *
 * @param {object} props all values of list events
 * @returns {React.Component} list events with its add event button
 */
function EventList(props) {
	const { events, onAction, onActionViewContent } = props;
	return (
		<>
			{events &&
				events.map((event, index) => (
					<CardEvent
						onAction={onAction}
						key={index}
						event={event}
						onActionViewContent={onActionViewContent}
					/>
				))}
		</>
	);
}

EventList.propTypes = {
	events: PropTypes.array,
	onAction: PropTypes.func,
	onActionViewContent: PropTypes.func,
};

export default EventList;
