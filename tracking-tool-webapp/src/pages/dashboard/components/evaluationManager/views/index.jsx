import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EvaluationHistoryCardListView from './ListView';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import FormEvaluate from '../../RightSidebarEvaluate/FormEvaluate';
import UpdateForm from './UpdateForm';
import { useApplication } from 'application/context/AppContext';
import RightSidebarEvaluation from 'pages/dashboard/components/RightSidebarEvaluation';

/**
 * @param {object} props - Properties for MainView.
 * @param {object} props.user - Scholar Object.
 * @param {boolean} props.showFormEvent - if true shows the create Form.
 * @returns {React.Component} - Jsx Element.
 */
function MainView(props) {
	const { user, showCreateForm, showUpdateForm, showChangeStatusForm, displayNewView, data } =
		props;
	const [state, actions] = useSubjectDetailsContext();
	const [, appActions] = useApplication();
	/**
	 * a skeleton to add sidebar view for update and edit
	 *
	 * @param {object} component - the component that will be opened on the side bar
	 */
	const addSideBarView = (component) => {
		appActions.onSidebarAddView({
			header: null,
			content: component,
			footer: null,
			onHide: () => {
				appActions.onHideSidebar();
				appActions.onShareInformation({ eventFormValues: {} });
			},
		});
	};
	useEffect(() => {
		actions.onAddView(
			<EvaluationHistoryCardListView
				user={user}
				data={data}
				onAction={(event) => {
					addSideBarView(
						<RightSidebarEvaluation
							item={props}
							updateForm={true}
							statusForm={false}
							displayNewView={true}
							data={event}
						/>
					);
				}}
				displayNewView={displayNewView}
			/>
		);
		if (showCreateForm) {
			actions.onAddView(<FormEvaluate item={data} subjectId={data.subjectId} />);
		}
		if (showUpdateForm) {
			actions.onAddView(<UpdateForm data={data} displayNewView={displayNewView} />);
		}
	}, [user.id, showChangeStatusForm]);

	return <>{state.viewStack[state.viewStack.length - 1]}</>;
}

MainView.propTypes = {
	user: PropTypes.object,
	showUpdateForm: PropTypes.bool,
	showCreateForm: PropTypes.bool,
	showChangeStatusForm: PropTypes.bool,
	displayNewView: PropTypes.bool,
	onChange: PropTypes.func,
	data: PropTypes.object,
};

export default MainView;
