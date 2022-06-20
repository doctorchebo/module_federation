import React, { useState, useEffect } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import FileProgressBar from '../fileProgressBar';
import { validateFileSize } from '../../helpers/sizeValidator';
import { validateFileExtension } from '../../helpers/extensionValidator';
import { cardTypes } from './cardTypeEnum';
import './styles.css';

/**
 * @param {*} properties -
 * @returns {React.Component} Generic Attachment card component
 */
export default function FileCard(properties) {
	const { file, cardInfo, fileMethods, extraData } = properties;
	const { validMaximunSize, validFiles } = cardInfo;
	const { handleDelete, onUpload } = fileMethods;
	const [progressCount, setProgressCount] = useState(0);
	const [finishProcess, setFinishProcess] = useState(false);
	const [type, setType] = useState(cardTypes.normal);
	const [errors, setErrors] = useState(null);
	const onProgress = (newPercentage) => {
		setProgressCount(newPercentage);
	};

	const validateSize = () => {
		return validMaximunSize
			? validateFileSize(file.fileObject.src.size, validMaximunSize)
			: false;
	};

	const validateExtension = () => {
		return validFiles
			? validateFileExtension(validFiles, file.fileObject.src.name, file.fileObject.src.type)
			: false;
	};

	const initialFileValidation = () => {
		if (validateSize()) {
			if (validateExtension()) {
				return { valid: true };
			}
			return { valid: false, message: 'File extension is not valid' };
		}
		return { valid: false, message: `The Size is higher than ${validMaximunSize} Mbs.` };
	};

	const getFetchData = () => {
		const formData = new FormData();
		formData.append('file', file.fileObject.src);
		formData.append('eventId', extraData.eventId);
		return formData;
	};

	/** */
	function fetchData() {
		onUpload({
			data: getFetchData(),
			onProgress,
		})
			.then((data) => setType(cardTypes.success))
			.catch((e) => {
				setErrors(e.errors || e.message);
				setType(cardTypes.error);
			})
			.finally(() => setFinishProcess(true));
	}

	useEffect(() => {
		if (!finishProcess) {
			const validateInformation = initialFileValidation();
			if (validateInformation.valid) {
				fetchData();
			} else {
				setFinishProcess(true);
				setType(cardTypes.error);
				setErrors(validateInformation.message);
			}
		}
	}, []);

	const getErrors = () => {
		if (errors) {
			if (typeof errors === 'string') {
				return <p>{errors}</p>;
			}
			if (typeof errors === 'object') {
				return (
					<ul>
						{errors.map((error, i) => {
							return <li key={i}>{error.message}</li>;
						})}
					</ul>
				);
			}
		}
	};

	const getFileColor = () => {
		switch (type) {
			case cardTypes.error:
				return 'red';
			case cardTypes.success:
				return 'green';
			case cardTypes.normal:
				return 'grey';
			default:
				return null;
		}
	};

	return (
		<Message
			color={getFileColor()}
			onDismiss={() => {
				handleDelete(file.id);
			}}
			className='file-card'
			size='small'
		>
			<Message.Content className='content'>
				<Icon name={cardInfo.icon} size='big' color='grey' />
				<div className='info-content'>
					<div className='filename'>{file.fileObject.src.name}</div>
					<div>
						{!finishProcess && (
							<div className='ui small progress'>
								<FileProgressBar value={progressCount} />
							</div>
						)}
						{errors && getErrors()}
					</div>
				</div>
			</Message.Content>
		</Message>
	);
}
