import React, { useCallback } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { PropTypes } from 'prop-types';
import DragAndDrop from 'components/dragAndDrop';
import AlertPopup from 'components/alertPopup';
import locale from '../../locale/en.json';
import { isImage, convertBase64ToCanvasRef } from '../../helpers/imageHelper';
import './index.css';

/**
 * @param {object} props This object contain actions to execute
 * @returns {React.Component} - ModalImageProfile
 */
export default function ProfileImageModal(props) {
	const { imageSource, openModal, handleOpenModal, error, showImageModalError, handleSaveImage } =
		props;
	const imgRef = React.useRef(null);
	const previewCanvasRef = React.useRef(null);
	const [filesInfo, setFilesInfo] = React.useState([]);
	const [imageLoaded, setImageLoaded] = React.useState({ image: null });
	const [cropState, setCrop] = React.useState({
		crop: {
			unit: 'px',
			aspect: 1 / 1,
			width: 200,
			height: 200,
		},
	});
	const fileTypes = locale.fileTypes;

	React.useEffect(() => {
		if (filesInfo.length > 0) {
			loadImage();
		}
	}, [filesInfo]);

	React.useEffect(() => {
		setImageLoaded(null);
	}, [openModal]);

	/**
	 * @param {object} files array of files
	 */
	function handleDropAccepted(files) {
		setFilesInfo(files);
	}

	/**
	 * Function to verify if the file is image an save image
	 */
	function loadImage() {
		const image = filesInfo[0];
		if (isImage(image)) {
			showImageModalError(false);
			sendImage(image);
		} else {
			showImageModalError(true);
		}
	}

	/**
	 * @param {object} image to send
	 */
	function sendImage(image) {
		const itemFileReader = new FileReader();
		itemFileReader.addEventListener(
			'load',
			() => {
				setImageLoaded({ image: itemFileReader.result });
			},
			false
		);
		itemFileReader.readAsDataURL(image);
	}

	const handleImageLoaded = useCallback((img) => {
		imgRef.current = img;
	}, []);

	const handleCropChange = (crop) => {
		setCrop({ crop: crop });
	};

	const handleCropComplete = (crop) => {
		const image = imgRef.current;
		const canvas = previewCanvasRef.current;
		convertBase64ToCanvasRef(canvas, image, crop);
	};

	return (
		<div className='modal-profile'>
			<Modal
				onOpen={() => handleOpenModal(true)}
				open={openModal}
				trigger={<Image className='image' src={imageSource} />}
			>
				<Modal.Header>{locale.header}</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						{!imageLoaded && (
							<Header>
								<DragAndDrop
									text={{ fileTypes: fileTypes, clickHere: 'Clicking here' }}
									onDropAccepted={handleDropAccepted}
								/>
							</Header>
						)}
						{error && (
							<AlertPopup
								content={locale.formatError}
								color={'red'}
								dismiss={true}
								setDismiss={() => showImageModalError(false)}
							/>
						)}
						{imageLoaded && (
							<div className='react-crop'>
								<ReactCrop
									src={imageLoaded.image}
									crop={cropState.crop}
									minWidth='150'
									minHeight='150'
									maxWidth='400'
									maxHeight='400'
									keepSelection
									onImageLoaded={handleImageLoaded}
									onComplete={handleCropComplete}
									onChange={handleCropChange}
								/>
								<canvas
									ref={previewCanvasRef}
									style={{
										width: 0,
										height: 0,
									}}
								></canvas>
							</div>
						)}
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						className='cancel-button'
						content={locale.cancel}
						onClick={() => handleOpenModal(false)}
					/>
					<Button
						className='save-button'
						content={locale.save}
						disabled={!imageLoaded}
						onClick={() => handleSaveImage(previewCanvasRef, filesInfo[0])}
					/>
				</Modal.Actions>
			</Modal>
		</div>
	);
}

ProfileImageModal.propTypes = {
	imageSource: PropTypes.string,
	openModal: PropTypes.bool,
	handleOpenModal: PropTypes.func,
	error: PropTypes.bool,
	showImageModalError: PropTypes.func,
	handleSaveImage: PropTypes.func,
};
