import { useHistory } from 'react-router';
import React, { Suspense, useEffect } from 'react';
import './index.css';
import { useApplication } from 'application/context/AppContext';

const RemoteApp = React.lazy(() => import('app2/index'));

/**
 * @returns {React.Component} -
 */
export default function Login() {
	const [state, actions] = useApplication(); //TODO connect with the login logic
	const history = useHistory();

	const onSignIn = () => {
		console.log('Prop drill function activated');
		actions.onDashboard();
	};

	function toProfile() {
		//TODO connect with the login logic
		history.push('/dashboard');
	}

	return (
		<Suspense fallback={'loading...'}>
			<RemoteApp onSignIn={onSignIn} />
		</Suspense>
	);
}
