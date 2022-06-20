import React, { useState } from 'react';
import Locale from './locale/en.json';
import HeaderTitle from './components/header';
import FileManager from './components/fileManager/index';
import PropTypes from 'prop-types';

/**
 * Renders the Component to upload/import files
 *
 * @param {*} properties component properties
 * @returns {*} {React.Component}- Component to upload files
 */
export default function UploadFile(properties) {
	const { icon, validFilesUI, validFiles, validMaximunSizeMb, extraData, onUpload } = properties;
	const [files, setFiles] = useState([]);

	/**
	 * List of file information
	 *
	 * @param {Array} newFiles array of files
	 */
	function handleDropAccepted(newFiles) {
		const filesObject = newFiles.map((file) => {
			return {
				state: 'no-valid',
				src: file,
				errorList: [],
			};
		});
		setFiles([...files, ...filesObject]);
	}

	const handleValidateFileState = (updateIndex, actualState) => {
		files[updateIndex].state = actualState;
	};

	const handleAddFileError = (fileIndex, error) => {
		if (!files[fileIndex].errorList.includes(error)) {
			files[fileIndex].errorList.push(error);
		}
	};

	const onDeleteAttachment = (deleteIndex) => {
		const newFileList = files.filter((file, index) => index !== deleteIndex);
		setFiles(newFileList);
	};

	return (
		<div className='upload-file'>
			<HeaderTitle title={`${Locale.title}`} subTitle={Locale.subTitle} />
			<FileManager
				text={{
					validFilesUI,
					clickHere: Locale.clickingHere,
				}}
				uploadMethods={{
					onDropAccepted: handleDropAccepted,
					handleDelete: onDeleteAttachment,
					handleValidateFileState: handleValidateFileState,
					handleAddFileError: handleAddFileError,
					onUpload: onUpload,
				}}
				cardInfo={{
					validFiles: validFiles,
					validMaximunSize: validMaximunSizeMb,
					icon: icon,
				}}
				filesInfo={files}
				extraData={extraData}
			/>
		</div>
	);
}

UploadFile.propTypes = {
	icon: PropTypes.string,
	validFilesUI: PropTypes.string,
	validFiles: PropTypes.string,
	validMaximunSizeMb: PropTypes.number,
	extraData: PropTypes.object,
	onUpload: PropTypes.func,
};

UploadFile.defaultProps = {
	icon: 'file alternate outline',
	validFilesUI: 'Your Files!',
	validFiles: '*',
	validMaximunSizeMb: null,
	extraData: null,
};
