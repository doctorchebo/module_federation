import React from 'react';
import PropTypes from 'prop-types';
import MainView from './views';
import './styles.css';

/**
 * @param {object} props - component properties
 * @param {object} props.user - user object
 * @param {object} props.data - event object
 * @returns {React.Component} - smart component for event management
 */
function EventManager(props) {
	const {
		user,
		showFormEvent,
		showUpdateForm,
		showChangeStatusForm,
		showAttachmentList,
		displayNewView,
		data,
	} = props;

	return (
		<div className='event-list'>
			<MainView
				user={user}
				showFormEvent={showFormEvent}
				showUpdateForm={showUpdateForm}
				showChangeStatusForm={showChangeStatusForm}
				showAttachmentList={showAttachmentList}
				displayNewView={displayNewView}
				data={data}
			></MainView>
		</div>
	);
}

EventManager.propTypes = {
	user: PropTypes.object,
	data: PropTypes.object,
	showFormEvent: PropTypes.bool,
	showUpdateForm: PropTypes.bool,
	showChangeStatusForm: PropTypes.bool,
	showAttachmentList: PropTypes.bool,
	displayNewView: PropTypes.bool,
};

export default EventManager;
