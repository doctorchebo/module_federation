import EvaluationTab from '../evaluations.tab';
import React from 'react';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import locale from 'pages/dashboard/components/evaluationManager/locale/en.json';

/**
 * Renders the content of RightSidebar when works with eveluation
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvaluation content
 */
export default function RightSidebarEvaluation(properties) {
	const { item, updateForm, statusForm, displayNewView, data } = properties;

	return (
		<>
			<ScholarSideBarHeader user={item?.User} title={locale.title}></ScholarSideBarHeader>
			<EvaluationTab
				user={item}
				showUpdateForm={updateForm}
				showChangeStatusForm={statusForm}
				displayNewView={displayNewView}
				data={data}
			/>
		</>
	);
}
