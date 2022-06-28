import { useHistory } from 'react-router';
import React, { Suspense, useEffect } from 'react';
import './index.css';
import { useApplication } from 'application/context/AppContext';
const RemoteApp = React.lazy(() => import('app2/index'));

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function Login(props) {
	const [state, actions] = useApplication();
	const history = useHistory();

	const onSignIn = () => {
		actions.onSetIsLoggedIn();
		actions.onProfile();
	};

	useEffect(() => {
		if (state.isLoggedIn) {
			history.push('/dashboard');
		}
	}, [state.isLoggedIn]);

	return (
		<Suspense fallback={'loading...'}>
			<RemoteApp onSignIn={onSignIn} />
		</Suspense>
	);
}
