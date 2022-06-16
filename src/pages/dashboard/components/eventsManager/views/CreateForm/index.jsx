import React, { useEffect } from 'react';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import EventFormComponent from 'pages/dashboard/components/eventsManager/components/eventForm';
import {
	eventTypesToOptions,
	stagesToOptions,
	notificationUsersToOptions,
} from 'pages/dashboard/components/eventsManager/helpers/normalize';
import locale from 'pages/dashboard/components/eventsManager/locale/en.json';
import { useApplication } from 'application/context/AppContext';
import UploadFile from 'components/uploadFileRefactor/uploadFile';
import RightSidebarEvent from 'pages/dashboard/components/RightSidebarEvent';
import { buildNotification } from 'pages/dashboard/components/eventsManager/helpers/notification';
import { buildEmail } from 'pages/dashboard/components/eventsManager/helpers/email';
import PropTypes from 'prop-types';

/**
 * @param {object} props - Properties for MainView.
 * @returns {React.Component} - Jsx Element for Create Event Form.
 */
function CreateForm(props) {
	const [appState, appActions] = useApplication();
	const { state, actions } = useEventsStore();
	const {
		share: { eventFormValues },
	} = appState;
	const formProps = {
		notificationUsers: notificationUsersToOptions(state.usersToNotify),
		eventTypes: eventTypesToOptions(state.eventTypes),
		stages: stagesToOptions(state.stages),
		errorMessages: locale.errorMessages,
		eventForm: locale.eventForm,
		eventFormAction: locale.eventForm.create,
		scholar: state.selectedScholar,
		...eventFormValues,
	};

	useEffect(() => {
		actions.onGetStages(state.selectedScholar.programVersionId);
		actions.onGetCurrentStage(state.selectedScholar.id);
		actions.onGetEventTypes();
	}, []);

	const onAttach = () => {
		appActions.onSidebarPopView();
		appActions.onSidebarAddView({
			header: null,
			content: (
				<RightSidebarEvent
					item={state.selectedScholar}
					eventForm={true}
					updateForm={false}
					statusForm={false}
				/>
			),
			footer: null,
		});
		appActions.onSidebarAddView({
			header: {
				back: {
					basic: false,
					color: null,
					content: 'Back',
					icon: { name: 'left arrow', position: 'left' },
					size: 'tiny',
					onClick: () => appActions.onSidebarPopView(),
				},
			},
			content: <UploadFile />,
			footer: null,
		});
	};

	const onGetMatchedUsers = ({ criteria = '' }) => {
		actions.onGetUsersToNotify({ criteria });
	};

	const onGetSelectedUsers = (users) => {
		actions.onSelectUsersToNotify(users);
	};

	return (
		<EventFormComponent
			{...formProps}
			onCancel={() => {
				props.displayNewView ? appActions.onHideSidebar() : actions.onPopView();
				appActions.onShareInformation({ eventFormValues: {} });
			}}
			onSubmit={(value) => {
				const payload = {
					scholarId: state.selectedScholar.id,
					...value,
				};
				actions.onPostEvent(payload);
				appActions.onShareInformation({ eventFormValues: {} });
				actions.onSendNotifications(
					buildNotification({
						...value,
						type: 'event',
						notifyTo: state.selectedUsers,
					})
				);
				actions.onSendEmails(
					buildEmail({
						...value,
						type: locale.notificationType.event,
						profile: appState.profile,
						events: state.eventTypes,
						notifyTo: state.selectedUsers,
					})
				);
				props.displayNewView && appActions.onHideSidebar();
			}}
			onAttach={() => onAttach()}
			onShare={(values) => {
				appActions.onShareInformation({ eventFormValues: values });
			}}
			onChangeUsersToNotify={onGetMatchedUsers}
			onGetSelectedUsers={onGetSelectedUsers}
		/>
	);
}

CreateForm.propTypes = {
	displayNewView: PropTypes.bool,
};

export default CreateForm;
