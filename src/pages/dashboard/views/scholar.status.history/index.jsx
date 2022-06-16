import React from 'react';
import PropTypes from 'prop-types';
import { StatusDataProvider } from './context';
import './styles.css';
import ScholarStatusTimeline from './list';

/**
 * @param {object} props - component properties
 * @param {object} props.user - user object
 * @param {object} props.event - event object
 * @returns {React.Component} - smart component for event management
 */
function StatusManager(props) {
	const { user, showFormEvent } = props;

	return (
		<StatusDataProvider>
			<ScholarStatusTimeline user={user} showFormEvent={showFormEvent} />
		</StatusDataProvider>
	);
}

StatusManager.propTypes = {
	user: PropTypes.object,
	event: PropTypes.object,
	showFormEvent: PropTypes.bool,
};

export default StatusManager;
