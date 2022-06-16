/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import './styles.css';
import EventManager from 'pages/dashboard/components/eventsManager';
import locale from 'pages/dashboard/locale/en.json';

/**
 * Renders multiple tabs
 *
 * @param {object} properties all info about scholar
 * @returns {React.Component} - Tab component for Scholars Page.
 */
export default function ScholarsTab(properties) {
	const {
		user,
		showFormEvent,
		showUpdateForm,
		showChangeStatusForm,
		showAttachmentList,
		displayNewView,
		data,
	} = properties;
	return (
		<>
			<Tab
				className='scholars tab'
				menu={{
					secondary: true,
					pointing: true,
				}}
				defaultActiveIndex='0'
				panes={[
					{
						menuItem: locale.scholars.tab.menuItems[0],
						render: () => (
							<EventManager
								user={user}
								showFormEvent={showFormEvent}
								showUpdateForm={showUpdateForm}
								showChangeStatusForm={showChangeStatusForm}
								showAttachmentList={showAttachmentList}
								displayNewView={displayNewView}
								data={data}
							></EventManager>
						),
					},
				]}
			/>
		</>
	);
}

ScholarsTab.propTypes = {
	user: PropTypes.object,
	showFormEvent: PropTypes.bool,
	showUpdateForm: PropTypes.bool,
	showChangeStatusForm: PropTypes.bool,
	showAttachmentList: PropTypes.bool,
	displayNewView: PropTypes.bool,
	data: PropTypes.object,
};

ScholarsTab.defaultProps = {
	user: {},
	showFormEvent: false,
	showUpdateForm: false,
	showChangeStatusForm: false,
};
