import React, { useEffect } from 'react';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import { useApplication } from 'application/context/AppContext';
import CardAttachment from '../../components/cardAttachment';
import { Button, Container, Icon } from 'semantic-ui-react';
import RightSidebarEvent from 'pages/dashboard/components/RightSidebarEvent';
import UploadFile from 'components/uploadFileRefactor/uploadFile';
import locale from '../../locale/en.json';
import './styles.css';

/**
 * @param {object} props - Component properties.
 * @returns {React.Component} - View component for attachment list.
 */
function AttachmentList(props) {
	const [appState, appActions] = useApplication();
	const { state, actions } = useEventsStore();
	const { attachments, selectedEvent } = state;

	useEffect(() => {
		actions.onGetAttachments(appState.share.eventValues);
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
			content: <RightSidebarEvent item={state.selectedScholar} attachmentList={true} />,
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
					onClick: () => {
						appActions.onSidebarPopView();
					},
				},
			},
			content: <UploadFile {...uploadProps} />,
			footer: null,
		});
	};

	return (
		<>
			<Container>
				<Button
					className='back-button'
					icon
					labelPosition='left'
					onClick={() => {
						actions.onPopView();
					}}
				>
					<Icon name='left arrow' />
					{'Back'}
				</Button>
				<Button className='add-event-btn' onClick={() => onAttach()}>
					{locale.attachment}
					<Icon name='add' />
				</Button>
			</Container>
			{attachments.map((attachment, index) => (
				<CardAttachment
					key={index}
					attachment={attachment}
					event={selectedEvent}
					onAction={(attachment, event) => {
						actions.onDeleteAttachment({ attachment: attachment, event: event });
					}}
				/>
			))}
		</>
	);
}

export default AttachmentList;
