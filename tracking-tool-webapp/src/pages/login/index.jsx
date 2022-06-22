import { useHistory } from 'react-router';
import React, { Suspense } from 'react';
import './index.css';
import { useApplication } from 'application/context/AppContext';

const RemoteApp = React.lazy(() => import('app2/App'));

/**
 * @returns {React.Component} -
 */
export default function Login() {
	const [state] = useApplication(); //TODO connect with the login logic
	const history = useHistory();

	/**
	 *
	 */
	function toProfile() { //TODO connect with the login logic
		history.push('/dashboard');
	}

	return (
		<Suspense fallback={'loading...'}>
			<RemoteApp />
		</Suspense>
	);
}
