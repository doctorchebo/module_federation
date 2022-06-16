import React from 'react';
import ScholarsTab from '../scholars.tab';
import ScholarSideBarHeader from '../scholar.sidebar.header';

/**
 * Renders the content of RightSidebar when works with events
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvent content
 */
export default function RightSidebarEvent(properties) {
	const { item, eventForm, updateForm, statusForm, attachmentList, displayNewView, data } =
		properties;
	return (
		<>
			<ScholarSideBarHeader user={item?.User} title=''></ScholarSideBarHeader>
			<ScholarsTab
				user={item}
				showFormEvent={eventForm}
				showUpdateForm={updateForm}
				showChangeStatusForm={statusForm}
				showAttachmentList={attachmentList}
				displayNewView={displayNewView}
				data={data}
			/>
		</>
	);
}
