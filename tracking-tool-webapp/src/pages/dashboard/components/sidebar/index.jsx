import { Menu, Sidebar } from 'semantic-ui-react';
import React from 'react';
import { PropTypes } from 'prop-types';
import UploadFile from 'components/uploadFile';
import UploadReports from '../reports';
import { useDashBoardContext } from 'pages/dashboard/context/Context';
import './styles.css';

/**
 * @param {*} props -
 * @returns {React.Component} - component for showing a side bar.
 */
export default function SideBar(props) {
	const { state, actions, validateFunction } = props;
	const [sideBarState, sideBarActions] = useDashBoardContext();
	return (
		<Sidebar
			as={Menu}
			animation='overlay'
			icon='labeled'
			vertical
			visible={sideBarState.importing}
			direction='right'
			width='very wide'
			className='sidebar'
		>
			{!state.reports?.success && (
				<UploadFile
					actions={actions}
					state={state}
					title={state.title}
					fileTypes={state.fileTypes}
					validate={validateFunction}
					onClose={() => {
						sideBarActions.onImporting(false);
						!!actions.ResetMessages && actions?.ResetMessages(false);
					}}
					dimmer={state.loading}
					sendFiles={(formData) => {
						actions.onImportFiles(formData);
					}}
				/>
			)}
			{state.reports?.success && (
				<UploadReports
					title={state.title}
					reports={state.reports}
					onReset={actions.onRemoveReports}
					onClose={() => {
						sideBarActions.onImporting(false);
						!!actions.ResetMessages && actions?.ResetMessages(false);
					}}
				/>
			)}
		</Sidebar>
	);
}

SideBar.propTypes = {
	state: PropTypes.any,
	actions: PropTypes.any,
	validateFunction: PropTypes.any,
};
