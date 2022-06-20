import React, { useEffect } from 'react';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import EventFormComponent from '../../components/eventForm';
import UploadFile from 'components/uploadFileRefactor/uploadFile';
import { eventTypesToOptions, stagesToOptions } from '../../helpers/normalize';
import { useApplication } from 'application/context/AppContext';
import locale from '../../locale/en.json';
import RightSidebarEvent from 'pages/dashboard/components/RightSidebarEvent';
import { ObjectIsEmpty } from 'helpers/validators';
import PropTypes from 'prop-types';

/**
 * @param {object} props - Properties for MainView.
 * @returns {React.Component} - Jsx Element for Update event Form.
 */
function UpdateForm(props) {
	const [appState, appActions] = useApplication();
	const { state, actions } = useEventsStore();
	let {
		share: { eventFormValues },
	} = appState;
	let formProps = {
		eventTypes: eventTypesToOptions(state.eventTypes),
		stages: stagesToOptions(state.stages),
		errorMessages: locale.errorMessages,
		eventForm: locale.eventForm,
		eventFormAction: locale.eventForm.update,
		scholar: state.selectedScholar,
	};

	if (!ObjectIsEmpty(state.selectedEvent)) {
		formProps = {
			...formProps,
			...state.selectedEvent,
			eventTypeId: state.selectedEvent.eventType.id,
		};
	} else {
		if (props) {
			formProps = {
				...formProps,
				...props.data,
				eventTypeId: props.data.eventType.id,
			};
			eventFormValues = {
				...eventFormValues,
				eventId: props.data.id,
			};
		} else {
			formProps = {
				...formProps,
				eventTypeId: eventFormValues.eventTypeId,
				stageId: eventFormValues.stageId,
				subjectId: eventFormValues.subjectId,
				title: eventFormValues.title,
				description: eventFormValues.description,
			};
		}
	}

	useEffect(() => {
		if (!ObjectIsEmpty(state.selectedEvent)) {
			appActions.onShareInformation({
				eventFormValues: {
					eventId: state.selectedEvent.id,
					eventTypeId: formProps.eventTypeId,
					stageId: formProps.stageId,
					subjectId: formProps.subjectId,
					title: formProps.title,
					description: formProps.description,
				},
			});
		}
		actions.onGetStages(state.selectedScholar.programVersionId);
		actions.onGetEventTypes();
	}, []);

	const uploadProps = {
		icon: 'file',
		validFilesUI: '.docx .xlsx .xls .csv .pptx .txt .pdf and images',
		validFiles: '.docx,.xlsx,.xls,.csv,.pptx,.txt,.pdf,image/*',
		validMaximunSizeMb: 25,
		extraData: {
			eventId: state.selectedEvent.id,
		},
		onUpload: actions.onUploadAttachments,
	};

	const onAttach = () => {
		appActions.onSidebarPopView();
		appActions.onSidebarAddView({
			header: null,
			content: (
				<RightSidebarEvent
					item={state.selectedScholar}
					eventForm={false}
					updateForm={true}
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
			content: <UploadFile {...uploadProps} />,
			footer: null,
		});
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
					id: eventFormValues.eventId,
					...value,
				};
				actions.onPutEvent(payload);
				appActions.onShareInformation({ eventFormValues: {} });
				props.displayNewView && appActions.onHideSidebar();
			}}
			onAttach={() => onAttach()}
			onShare={(values) => {
				appActions.onShareInformation({
					eventFormValues: { ...eventFormValues, ...values },
				});
			}}
		></EventFormComponent>
	);
}

UpdateForm.propTypes = {
	displayNewView: PropTypes.bool,
	data: PropTypes.object,
};

export default UpdateForm;
