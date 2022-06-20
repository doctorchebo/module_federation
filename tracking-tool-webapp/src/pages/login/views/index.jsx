import { useApplication } from 'application/context/AppContext';
import React, { Suspense, useEffect } from 'react';
import SignIn from '../components/signin';
import { PropTypes } from 'prop-types';
const RemoteApp = React.lazy(() => import('app2/App'));
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

	return (
		<Suspense fallback={'loading...'}>
			<RemoteApp />
		</Suspense>
	);
}

LoginView.propTypes = {
	redirectToProfile: PropTypes.any,
};
