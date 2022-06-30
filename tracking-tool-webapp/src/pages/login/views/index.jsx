import { useApplication } from 'application/context/AppContext';
import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
/**
 * @param {*} props -
 * @returns {object} Login View
 */
export default function LoginView(props) {
	const [state, actions] = useApplication();

	useEffect(() => {
		if (state.isLoggedIn) {
			props.redirectToProfile();
		}
	}, [state.isLoggedIn]);

	/**
	 * @param {object} credential username and password info
	 */
	function loginHandle(credential) {
		actions.onSignIn(credential);
	}

	return <div>Old login Page</div>;
}

LoginView.propTypes = {
	redirectToProfile: PropTypes.any,
};
