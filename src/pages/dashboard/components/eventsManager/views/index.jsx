import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import EventCardListView from './ListView';
import CreateForm from './CreateForm';
import UpdateForm from './UpdateForm';
import AttachmentList from './event.attachments';
import UpdateStatusForm from './StatusForm';

/**
 * @param {object} props - Properties for MainView.
 * @param {object} props.user - Scholar Object.
 * @param {boolean} props.showFormEvent - if true shows the create Form.
 * @returns {React.Component} - Jsx Element.
 */
function MainView(props) {
	const {
		user,
		showFormEvent,
		showUpdateForm,
		showChangeStatusForm,
		showAttachmentList,
		displayNewView,
		data,
	} = props;
	const { state, actions } = useEventsStore();
	useEffect(() => {
		return () => {
			actions.onClearViewStack();
		};
	}, []);

	useEffect(() => {
		actions.onSelectScholar(user);

		const payload = { scholarId: user.id, pageNumber: state.pagination.currentPage };
		actions.onSearchEvent(payload);

		actions.onAddView(<EventCardListView user={user} displayNewView={displayNewView} />);
		if (showFormEvent) {
			actions.onAddView(<CreateForm displayNewView={displayNewView} />);
		} else if (showUpdateForm) {
			actions.onAddView(<UpdateForm data={data} displayNewView={displayNewView} />);
		} else if (showChangeStatusForm) {
			actions.onAddView(<UpdateStatusForm />);
		} else if (showAttachmentList) {
			actions.onAddView(<AttachmentList />);
		}
	}, [user.id, showChangeStatusForm]);

	return <>{state.viewStack[state.viewStack.length - 1]}</>;
}

MainView.propTypes = {
	user: PropTypes.object,
	showFormEvent: PropTypes.bool,
	showUpdateForm: PropTypes.bool,
	showChangeStatusForm: PropTypes.bool,
	showAttachmentList: PropTypes.bool,
	displayNewView: PropTypes.bool,
	onChange: PropTypes.func,
	data: PropTypes.object,
};

export default MainView;
