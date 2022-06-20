import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Segment, Dimmer, Progress } from 'semantic-ui-react';
import FileList from 'components/fileList';
import DragAndDrop from 'components/dragAndDrop';
import ImportHeader from 'pages/dashboard/components/importHeader';
import Locale from './locale/en.json';
import Button from 'components/button';
import LoggerService from 'services/LoggerService';
import './index.css';
import ReportMessage from '../../pages/dashboard/components/reportMessage';

/**
 * @param {object} props props
 * @returns {object} prop
 */
export default function UploadFile(props) {
	const { fileTypes, title, validate, onClose, dimmer, sendFiles, actions, state } = props;
	const [filesInfo, setFilesInfo] = useState([]);
	const [enableImport, setEnableImport] = useState(false);
	const [errorMessage, setErrorMessage] = useState([]);
	const [successMessage, setSuccessMessage] = useState([]);

	useEffect(() => {
		validateFiles(filesInfo);
		handleSubmit();
	}, [filesInfo.length]);

	useEffect(() => {
		if (state.data?.error?.trim() !== '') {
			setErrorMessage(state.data?.error?.split(','));
		}
	}, [state.data?.error]);

	useEffect(() => {
		if (state.data?.message?.split(',').length > 0) {
			setSuccessMessage(state.data?.message?.split(','));
		}
	}, [state.data?.message]);

	/**
	 * @param {Array} files array of files
	 */
	function handleDropAccepted(files) {
		const fileObject = files.map((file) => {
			return {
				fileName: file.name,
				progress: '0',
				status: 'validing',
				src: file,
				isValidated: false,
			};
		});
		setFilesInfo([...filesInfo, ...fileObject]);
	}

	/**
	 * @param {Array} files array of files
	 */
	function validateFiles(files) {
		const getData = async () => {
			return Promise.all(
				files.map((file) => {
					return validate(file.src);
				})
			).catch((error) => {
				LoggerService.error(error);
			});
		};
		getData()
			.then((validation) => {
				const validatedFiles = files.map((file, index) => {
					if (validation[index].isValid) {
						return { ...file, status: 'success', isValidated: true, message: '' };
					}
					return {
						...file,
						status: 'error',
						message: validation[index].messages[0],
						isValidated: true,
					};
				});
				checkFilesValidity(validatedFiles);
				setFilesInfo(validatedFiles);
			})
			.catch((error) => LoggerService.error(error));
	}

	/**
	 * @param {Array} files array of files
	 */
	function checkFilesValidity(files) {
		if (files.length > 0) {
			const validity = files.reduce((accumulator, file) => {
				return accumulator && file.status === 'success';
			}, true);
			setEnableImport(validity);
		}
	}

	/**
	 * @param {number} deleteIndex file index for delete
	 */
	function handleDelete(deleteIndex) {
		const newFileInfo = filesInfo.filter((file, index) => index !== deleteIndex);
		if (newFileInfo.length === 0) {
			setEnableImport(false);
		}
		setFilesInfo(newFileInfo);
	}

	/**
	 * -
	 */
	function handleSubmit() {
		const formData = new FormData();
		const filesSend = filesInfo.map((file) => file.src);
		for (let i = 0; i < filesSend.length; i++) {
			formData.append('files', filesSend[i]);
		}
		sendFiles(formData);
	}

	return (
		<>
			<Dimmer inverted active={dimmer} className='dimmer'>
				<Progress
					active
					label={Locale.uploading}
					color='blue'
					percent={'100'}
					className='progress'
				/>
			</Dimmer>
			<Dimmer.Dimmable>
				<Segment className='uploadComponent' basic>
					<Button compact className='back-btn' onClick={onClose}>
						{`${Locale.backButton}${title}`}
					</Button>
					<ImportHeader
						title={`${Locale.importTitle}${title}`}
						subTitle={Locale.dragMessage}
					/>
					<Segment className='upload-card' basic>
						<DragAndDrop
							text={{ fileTypes: fileTypes, clickHere: Locale.clickingHere }}
							onDropAccepted={handleDropAccepted}
						/>
						<FileList files={filesInfo} onDelete={handleDelete}></FileList>
						{successMessage?.length > 0 && state.isMessageDisplayed && (
							<ReportMessage
								dataErrors={successMessage}
								status='success'
								fileName=''
							/>
						)}
						{errorMessage?.length && state.isMessageDisplayed && (
							<ReportMessage dataErrors={errorMessage} status='error' fileName='' />
						)}
					</Segment>
					<Button
						primary
						disabled={!enableImport}
						className='upload-btn'
						onClick={() => {
							actions?.onImportCandidates(state.dataJson);
							actions?.ResetMessages(false);
						}}
					>
						{Locale.finishImport}
					</Button>
					<Button basic className='upload-btn' onClick={onClose}>
						{Locale.cancelButton}
					</Button>
				</Segment>
			</Dimmer.Dimmable>
		</>
	);
}

UploadFile.propTypes = {
	fileTypes: PropTypes.string,
	title: PropTypes.string,
	validate: PropTypes.func,
	onClose: PropTypes.func,
	dimmer: PropTypes.bool,
	sendFiles: PropTypes.func,
	actions: PropTypes.object,
	state: PropTypes.object,
};

UploadFile.defaultProps = {
	actions: {},
	state: {},
};
