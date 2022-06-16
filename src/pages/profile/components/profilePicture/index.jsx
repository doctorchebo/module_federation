import React, { useEffect } from 'react';
import { useProfileContext } from '../../context';
import { Image } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';

/**
 * @param {*} user -
 * @returns {React.Component} -
 */
export default function ProfilePicture(user) {
	const [state, action] = useProfileContext();

	useEffect(() => {
		action.onGetUserImageById(user.userId);
	}, [user.userId]);

	if (state.loading || !state.userImage) {
		return <Loader active inline />;
	}

	return (
		<Image spaced circular size='mini' src={state.userImage.providerImageKey} alt='userImage' />
	);
}
