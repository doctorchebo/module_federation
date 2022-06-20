import {
	getSelectedUsersToNotify,
	updateUsersToNotify,
} from 'pages/dashboard/components/eventsManager/helpers/normalize.js';
import { EventsActionTypes, StatusActionTypes } from './types';

/**
 * Set an initial state for scholars view.
 *
 * @returns {object} - new state
 */
const initialState = {
	pagination: {
		currentPage: 1,
		pageSize: 10,
		totalCount: 0,
	},
	loadingEvents: false,
	scholarEvents: [],
	filterEvents: [],
	selectedScholar: {},
	showFormEvent: false,
	selectedEvent: {},
	stages: [],
	eventTypes: [],
	authors: [],
	subjects: [],
	viewStack: [],
	statusTypes: [],
	attachments: [],
	state: [],
	usersToNotify: [],
	selectedUsers: [],
};

export const eventsReducer = (state = initialState, action) => {
	switch (action.type) {
		case EventsActionTypes.loadingEvents:
			return {
				...state,
				loadingEvents: action.payload,
			};
		case EventsActionTypes.filterEvents:
			return {
				...state,
				scholarEvents: action.payload.data,
				pagination: action.payload.pagination,
			};
		case EventsActionTypes.Error:
			return {
				...state,
				errorMessages: action.payload,
			};
		case EventsActionTypes.onGetEvents:
			return {
				...state,
				scholarEvents: action.payload.data,
				pagination: action.payload.pagination,
			};
		case EventsActionTypes.onSelectEvent:
			return {
				...state,
				selectedEvent: action.payload,
			};
		case EventsActionTypes.onSelectScholar:
			return {
				...state,
				selectedScholar: action.payload,
			};
		case EventsActionTypes.onGetEventTypes:
			return {
				...state,
				eventTypes: action.payload.data,
			};
		case EventsActionTypes.onGetStages:
			return {
				...state,
				stages: action.payload.data,
			};
		case EventsActionTypes.onGetSubjects:
			return {
				...state,
				subjects: action.payload.data,
			};
		case EventsActionTypes.onGetAuthors:
			return {
				...state,
				authors: action.payload.data,
			};
		case EventsActionTypes.onAddView:
			return {
				...state,
				viewStack: [...state.viewStack, action.payload],
			};
		case EventsActionTypes.onPopView:
			return {
				...state,
				viewStack: state.viewStack.slice(0, state.viewStack.length - 1),
			};
		case EventsActionTypes.onClearViewStack:
			return {
				...state,
				viewStack: [],
			};
		case StatusActionTypes.onGetStatus:
			return {
				...state,
				status: action.payload.data,
			};
		case EventsActionTypes.onGetAttachments:
			return {
				...state,
				attachments: action.payload.data,
			};
		case EventsActionTypes.onDeleteAttachment:
			return {
				...state,
				attachments: [
					...state.attachments.filter((attachment) => {
						return attachment.id !== action.payload.attachment.id;
					}),
				],
			};
		case EventsActionTypes.onGetUsersToNotify:
			return {
				...state,
				usersToNotify: updateUsersToNotify(state.usersToNotify, action.payload.data),
			};
		case EventsActionTypes.onSelectUsersToNotify:
			return {
				...state,
				selectedUsers: getSelectedUsersToNotify(state.usersToNotify, action.payload),
				usersToNotify: getSelectedUsersToNotify(state.usersToNotify, action.payload),
			};
		default:
			return state;
	}
};
