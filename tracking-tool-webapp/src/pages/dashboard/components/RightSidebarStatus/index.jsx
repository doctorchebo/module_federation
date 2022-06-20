import React from 'react';
import PropTypes from 'prop-types';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import locale from 'pages/dashboard/locale/en.json';
import EventManager from '../eventsManager';
import './styles.css';

/**
 * Renders the content of RightSidebar when works with events
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvent content
 */
export default function RightSidebarStatus(properties) {
	const { user } = properties;

	return (
		<>
			<ScholarSideBarHeader user={user.User} title={locale.status} />
			<div className='status-form'>
				<EventManager user={user} showChangeStatusForm />
			</div>
		</>
	);
}

RightSidebarStatus.propTypes = {
	user: PropTypes.object.isRequired,
};
