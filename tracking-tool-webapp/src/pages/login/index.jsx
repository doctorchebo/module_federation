import { useHistory } from 'react-router';
import React, { Suspense, useEffect } from 'react';
import './index.css';
import { useApplication } from 'application/context/AppContext';
import { ApplicationActions } from 'application/enums';
import { useSessionStore } from 'store/sessionSlice/useSessionStore';
const RemoteApp = React.lazy(() => import('app2/index'));

/**
 * @returns {React.Component} -
 */
export default function Login(props) {
	const [state, actions] = useApplication(); //TODO connect with the login logic
	const history = useHistory();

	const onSignIn = () => {
		actions.onSetIsLoggedIn();
		console.log('IsloggedIn? => ' + state.isLoggedIn);
		console.log('token => ' + localStorage.getItem('token'));
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
