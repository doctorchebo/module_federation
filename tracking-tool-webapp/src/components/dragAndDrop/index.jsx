import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

/**
 *  @param {object} props properties received from parent
 *  @returns {React.Component} Drag and drop component
 */
export default function DragAndDrop(props) {
	const { onDropAccepted, onDropRejected, validExtension, text } = props;
	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDropAccepted,
		onDropRejected,
		accept: validExtension,
		noClick: true,
		noKeyboard: true,
	});

	return (
		<div className='dropzone-whole' {...getRootProps()} data-testid='dropArea'>
			<input className='dropzone-input' {...getInputProps()} />
			<div className='text-center'>
				<Icon name='upload' size='huge' color='grey' inverted />
				<p className='file-types'>{text.fileTypes}</p>
				{isDragActive ? (
					<p className='dropzone-content'>{text.textDragActive}</p>
				) : (
					<p className='dropzone-content'>{text.textDragInactive}</p>
				)}
				<p className='dropzone-content'>{text.optionToUpload}</p>
				<p>you can also upload files by</p>
				<a className='dropzone-link' onClick={open}>
					{text.clickHere}
				</a>
			</div>
		</div>
	);
}

DragAndDrop.propTypes = {
	onDropAccepted: PropTypes.func,
	onDropRejected: PropTypes.func,
	validExtension: PropTypes.string,
	text: PropTypes.object,
};
