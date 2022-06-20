import React from 'react';
import { Loader } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import locale from '../../locale/en.json';
import ProfileImageModal from '../modal';
import { reloadImage } from '../../helpers/imageHelper';
import { useProfileContext } from '../../context';
import './index.css';

/**
 * @param {object} props This object contain actions to execute
 * @returns {React.Component} - CardProfile
 */
export default function CardProfile(props) {
	const { role, profile } = props;
	const [state, actions] = useProfileContext();

	React.useEffect(() => {
		actions.onGetUserImage();
	}, []);

	const handleSaveImage = (previewCanvasRef, filesInfo) => {
		const target = new Image();
		target.src = previewCanvasRef.current.toDataURL();
		const imageBase64 = target.src.split(',')[1];
		const newImage = {
			Id: state.userImage.id,
			Image: imageBase64,
			Size: filesInfo.size,
		};
		actions.onPutUserImageById(newImage);
		actions.openProfileImageModal(false);
		reloadImage(actions.onLoad);
	};

	return (
		<div className='card-profile'>
			{state.loading ? (
				<Loader className='profile-loading' active={true} size={'huge'} inverted>
					{locale.loading}
				</Loader>
			) : (
				<>
					<ProfileImageModal
						imageSource={state.userImage.providerImageKey}
						openModal={state.showModalProfile}
						handleOpenModal={actions.openProfileImageModal}
						error={state.errorModal}
						showImageModalError={actions.showImageModalError}
						handleSaveImage={handleSaveImage}
					/>
					<div className={'info'}>
						<p className='title'>{locale.title}</p>
						<p className={'subtitle'}>{locale.subtitle}</p>
						<div className={'attribute'}>
							<p className={'key'}>{locale.firstName}</p>
							<p>{profile.firstName}</p>
						</div>
						<div className={'attribute'}>
							<p className={'key'}>{locale.lastName}</p>
							<p>{profile.lastName}</p>
						</div>
						<div className={'attribute'}>
							<p className={'key'}>{locale.email}</p>
							<p>{profile.email}</p>
						</div>
						<div className={'attribute'}>
							<p className={'subtitle'}>{locale.role}</p>
							<p>{role}</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

CardProfile.propTypes = {
	onLoadProfilePage: PropTypes.any,
	profile: PropTypes.object,
	role: PropTypes.string,
	actions: PropTypes.object,
};
