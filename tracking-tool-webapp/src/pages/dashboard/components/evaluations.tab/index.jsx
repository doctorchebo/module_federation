import React from 'react';
import PropTypes from 'prop-types';
import { SubjectDetailsDataProvider } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import MainView from 'pages/dashboard/components/evaluationManager/views';
import './styles.css';

/**
 * Renders multiple tabs
 *
 * @param {object} properties all info about scholar
 * @returns {React.Component} - Tab component for Scholars Page.
 */
export default function EvaluationsTab(properties) {
	const { user, showUpdateForm, showCreateForm, showChangeStatusForm, displayNewView, data } =
		properties;
	return (
		<>
			<SubjectDetailsDataProvider>
				<div className='event-list'>
					<MainView
						user={user}
						showUpdateForm={showUpdateForm}
						showCreateForm={showCreateForm}
						showChangeStatusForm={showChangeStatusForm}
						displayNewView={displayNewView}
						data={data}
					></MainView>
				</div>
			</SubjectDetailsDataProvider>
		</>
	);
}

EvaluationsTab.propTypes = {
	user: PropTypes.object,
	showUpdateForm: PropTypes.bool,
	showChangeStatusForm: PropTypes.bool,
	displayNewView: PropTypes.bool,
	data: PropTypes.object,
};

EvaluationsTab.defaultProps = {
	user: {},
	showUpdateForm: false,
	showChangeStatusForm: false,
};
