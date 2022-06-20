import React from 'react';
import { Segment } from 'semantic-ui-react';
import DragAndDrop from '../dragAndDrop';
import FileList from '../fileList';

/**
 * @param {*} properties -
 * @returns {React.Component} Generic File Manager list component
 */
export default function FileManager(properties) {
	const { text, uploadMethods, cardInfo, filesInfo, extraData } = properties;

	return (
		<Segment className='file-manager' basic>
			<DragAndDrop
				text={text}
				onDropAccepted={uploadMethods.onDropAccepted}
				validExtension={cardInfo.validFiles}
			/>
			<FileList
				fileMethods={{
					handleDelete: uploadMethods.handleDelete,
					handleValidateFileState: uploadMethods.handleValidateFileState,
					handleAddFileError: uploadMethods.handleAddFileError,
					onUpload: uploadMethods.onUpload,
				}}
				cardInfo={cardInfo}
				filesInfo={filesInfo}
				extraData={extraData}
			/>
		</Segment>
	);
}
