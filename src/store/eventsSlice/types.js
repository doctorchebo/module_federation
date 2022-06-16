const namespace = 'Events';

export const EventsActionTypes = {
	loadingEvents: `${namespace}.loadingEvents`,
	filterEvents: `${namespace}.filterEvents`,
	onGetEvents: `${namespace}.onGetEvents`,
	onGetCurrentStage: `${namespace}.onGetCurrentStage`,
	onPutEvent: `${namespace}.onPutEvent`,
	onPostEvent: `${namespace}.onPostEvent`,
	onUpdateChangeStatus: `${namespace}.onUpdateChangeStatus`,
	onSelectEvent: `${namespace}.onSelectEvent`,
	onSelectScholar: `${namespace}.onSelectScholar`,
	onGetEventTypes: `${namespace}.onGetEventTypes`,
	onGetStages: `${namespace}.onGetStages`,
	onGetAuthors: `${namespace}.onGetAuthors`,
	onGetSubjects: `${namespace}.onGetSubjects`,
	onAddView: `${namespace}.onAddView`,
	onPopView: `${namespace}.onPopView`,
	onClearViewStack: `${namespace}.onClearViewStack`,
	onGetAttachments: `${namespace}.onGetAttachments`,
	onDeleteAttachment: `${namespace}.onDeleteAttachment`,
	Error: `${namespace}.Error`,
	onGetUsersToNotify: `${namespace}.onGetUsersToNotify`,
	onSelectUsersToNotify: `${namespace}.onSelectUsersToNotify`,
};

const statusNamespace = 'Status';

export const StatusActionTypes = {
	loadingStatus: `${statusNamespace}.loadingStatus`,
	onGetStatus: `${statusNamespace}.onGetStatus`,
	Error: `${statusNamespace}.Error`,
};
