import React from 'react';
import EvaluationTab from '../evaluations.tab';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import locale from 'pages/dashboard/components/evaluationManager/locale/en.json';

/**
 * Renders the content of RightSidebar when works with events
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvent content
 */
export default function RightSidebarEvaluationHistory(properties) {
	const { item, data, updateForm, createForm, statusForm, displayNewView, onAction } = properties;
	const titleModal = updateForm ? locale.editTitle : locale.historyTitle;

	return (
		<>
			<ScholarSideBarHeader
				user={data?.scholarName}
				title={titleModal}
			></ScholarSideBarHeader>
			<EvaluationTab
				user={item}
				showUpdateForm={updateForm}
				showCreateForm={createForm}
				showChangeStatusForm={statusForm}
				displayNewView={displayNewView}
				data={data}
				onAction={onAction}
			/>
		</>
	);
}
