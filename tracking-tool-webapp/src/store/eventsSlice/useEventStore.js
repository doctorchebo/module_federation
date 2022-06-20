import {
	onGetEvents,
	onSelectEvent,
	onPutEvent,
	onPostEvent,
	onUpdateChangeStatus,
	onSelectScholar,
	onGetStages,
	onGetEventTypes,
	onGetSubjects,
	onGetAuthors,
	onAddView,
	onPopView,
	onClearViewStack,
	onGetCurrentStage,
	onGetStatus,
	onUploadEventAttachments,
	onGetAttachments,
	onDeleteAttachment,
	onSearchEvent,
	onGetUsersToNotify,
	onSelectUsersToNotify,
	onSendNotifications,
	onSendEmails,
} from './action';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @returns {Function} - useEventsStore
 */
export function useEventsStore() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.events);

	const onGetEventsCallback = useCallback(
		(eventId) => {
			dispatch(onGetEvents(eventId));
		},
		[dispatch]
	);

	const onSelectEventCallback = useCallback(
		(eventId) => {
			dispatch(onSelectEvent(eventId));
		},
		[dispatch]
	);

	const onPutEventCallback = useCallback(
		(eventId) => {
			dispatch(onPutEvent(eventId));
		},
		[dispatch]
	);

	const onPostEventCallback = useCallback(
		(eventId) => {
			dispatch(onPostEvent(eventId));
		},
		[dispatch]
	);

	const onUpdateChangeStatusCallback = useCallback(
		(eventId) => {
			dispatch(onUpdateChangeStatus(eventId));
		},
		[dispatch]
	);

	const onSelectScholarCallback = useCallback(
		(eventId) => {
			dispatch(onSelectScholar(eventId));
		},
		[dispatch]
	);

	const onGetStagesCallback = useCallback(
		(eventId) => {
			dispatch(onGetStages(eventId));
		},
		[dispatch]
	);

	const onGetEventTypesCallback = useCallback(() => {
		dispatch(onGetEventTypes());
	}, [dispatch]);

	const onGetSubjectsCallback = useCallback(() => {
		dispatch(onGetSubjects());
	}, [dispatch]);

	const onGetAuthorsCallback = useCallback(() => {
		dispatch(onGetAuthors());
	}, [dispatch]);

	const onAddViewCallback = useCallback(
		(eventId) => {
			dispatch(onAddView(eventId));
		},
		[dispatch]
	);

	const onPopViewCallback = useCallback(() => {
		onPopView(dispatch);
	}, [dispatch]);

	const onClearViewStackCallback = useCallback(() => {
		onClearViewStack(dispatch);
	}, [dispatch]);

	const onGetCurrentStageCallback = useCallback(
		(eventId) => {
			dispatch(onGetCurrentStage(eventId));
		},
		[dispatch]
	);

	const onGetStatusCallback = useCallback(
		(eventId) => {
			dispatch(onGetStatus(eventId));
		},
		[dispatch]
	);

	const onUploadAttachmentsCallback = useCallback(
		(eventId) => {
			dispatch(onUploadEventAttachments(eventId));
		},
		[dispatch]
	);

	const onGetAttachmentsCallback = useCallback(
		(eventId) => {
			dispatch(onGetAttachments(eventId));
		},
		[dispatch]
	);

	const onDeleteAttachmentCallback = useCallback(
		(eventId) => {
			dispatch(onDeleteAttachment(eventId));
		},
		[dispatch]
	);

	const onSearchEventCallback = useCallback(
		(eventId) => {
			dispatch(onSearchEvent(eventId));
		},
		[dispatch]
	);

	const onGetUsersToNotifyCallback = useCallback(
		(eventId) => {
			dispatch(onGetUsersToNotify(eventId));
		},
		[dispatch]
	);
	const onSelectUsersToNotifyCallback = useCallback(
		(eventId) => {
			dispatch(onSelectUsersToNotify(eventId));
		},
		[dispatch]
	);
	const onSendNotificationsCallback = useCallback(
		(eventId) => {
			dispatch(onSendNotifications(eventId));
		},
		[dispatch]
	);
	const onSendEmailsCallback = useCallback(
		(eventId) => {
			dispatch(onSendEmails(eventId));
		},
		[dispatch]
	);

	return {
		state,
		actions: {
			onGetEvents: onGetEventsCallback,
			onSelectEvent: onSelectEventCallback,
			onPutEvent: onPutEventCallback,
			onPostEvent: onPostEventCallback,
			onUpdateChangeStatus: onUpdateChangeStatusCallback,
			onSelectScholar: onSelectScholarCallback,
			onGetStages: onGetStagesCallback,
			onGetEventTypes: onGetEventTypesCallback,
			onGetSubjects: onGetSubjectsCallback,
			onGetAuthors: onGetAuthorsCallback,
			onAddView: onAddViewCallback,
			onPopView: onPopViewCallback,
			onClearViewStack: onClearViewStackCallback,
			onGetCurrentStage: onGetCurrentStageCallback,
			onGetStatus: onGetStatusCallback,
			onUploadEventAttachments: onUploadAttachmentsCallback,
			onGetAttachments: onGetAttachmentsCallback,
			onDeleteAttachment: onDeleteAttachmentCallback,
			onSearchEvent: onSearchEventCallback,
			onGetUsersToNotify: onGetUsersToNotifyCallback,
			onSelectUsersToNotify: onSelectUsersToNotifyCallback,
			onSendNotifications: onSendNotificationsCallback,
			onSendEmails: onSendEmailsCallback,
		},
	};
}
