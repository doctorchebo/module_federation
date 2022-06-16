import React from 'react';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import FormEvaluate from './FormEvaluate';

/**
 * Renders the content of RightSidebar when works with eveluation
 *
 * @param {object} properties - properties
 * @returns {React.Component} - RightSidebarEvaluate content
 */
export default function RightSidebarEvaluate(properties) {
	const { item, subjectId } = properties;

	return (
		<>
			<ScholarSideBarHeader
				user={item?.scholarName}
				title='Evaluation'
			></ScholarSideBarHeader>
			<FormEvaluate item={item} subjectId={subjectId} />
		</>
	);
}
